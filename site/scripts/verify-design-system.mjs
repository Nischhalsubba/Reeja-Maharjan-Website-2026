import { readFile } from 'node:fs/promises';

const fromRoot = async (path) => readFile(new URL('../' + path, import.meta.url), 'utf8');
const tokenFile = JSON.parse(await fromRoot('design-system/reeja-v1/tokens.json'));
const css = (await fromRoot('src/styles/tokens.css')) + '\n' + (await fromRoot('src/styles/design-system.css'));
const layout = await fromRoot('src/layouts/BaseLayout.astro');
const failures = [];
const tokens = [];

function collect(value, path = []) {
  if (!value || typeof value !== 'object') return;
  if ('$type' in value) {
    tokens.push({ name: path.join('.'), ...value });
    return;
  }
  for (const [key, nested] of Object.entries(value)) collect(nested, [...path, key]);
}
collect(tokenFile.tokens);
if (tokenFile.version !== '1.0.0') failures.push('DS token export version must be 1.0.0.');
if (tokens.length < 25) failures.push('DS token export has too few tokens.');
for (const token of tokens) {
  const variable = token.$extensions?.['reeja/css-variable'];
  if (!/^--[a-z][\w-]+$/.test(variable ?? '')) {
    failures.push(token.name + ': missing valid CSS token name.');
    continue;
  }
  const matched = css.match(new RegExp(variable.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&') + '\\s*:\\s*([^;]+);'));
  if (!matched) { failures.push(token.name + ': missing CSS variable ' + variable); continue; }
  if (matched[1].trim().toLowerCase() !== String(token.$value).trim().toLowerCase()) {
    failures.push(token.name + ': Figma and CSS differ (' + token.$value + ' vs ' + matched[1].trim() + ')');
  }
}
if (!layout.includes("import '../styles/design-system.css';")) failures.push('DS CSS must load from BaseLayout exactly once.');

const pages = ['clinical-research.astro', 'hire-reeja.astro', 'maternal-health.astro', 'nursing-practice.astro'];
for (const page of pages) {
  const source = await fromRoot('src/pages/' + page);
  if (!source.includes('components/design-system/')) failures.push(page + ': no actual DS component use.');
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi)?.slice(0, 3).map(part => parseInt(part, 16) / 255) ?? [];
  if (channels.length !== 3) return NaN;
  const linear = channels.map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + .05) / (dark + .05);
}
for (const [foreground, background, name] of [
  ['#FFFFFF', '#2F7368', 'Primary action label'],
  ['#202D3D', '#F5F8FA', 'Primary reading text'],
  ['#56697B', '#F5F8FA', 'Secondary reading text'],
  ['#B2E9DB', '#1C2C3A', 'Inverse seafoam text']
]) {
  const value = contrast(foreground, background);
  if (!(value >= 4.5)) failures.push(name + ' does not meet 4.5:1 (received ' + value.toFixed(2) + ')');
}
if (failures.length) {
  console.error('Design system checks failed:\n' + failures.map(v => '- ' + v).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Design System v1 verified: ' + tokens.length + ' CSS-backed Figma tokens, four consuming routes, AA text pairings.');
}
