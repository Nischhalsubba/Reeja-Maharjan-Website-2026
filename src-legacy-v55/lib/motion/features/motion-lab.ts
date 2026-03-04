import { loadAnime } from '../engines/anime';
import { loadLottie } from '../engines/lottie';
import { loadMojs } from '../engines/mojs';
import { loadMotion } from '../engines/motion';
import { loadPopmotion } from '../engines/popmotion';
import { runThreeMiniScene } from '../engines/three';
import { animateWithWAAPI } from '../engines/waapi';
import { loadVelocity } from '../engines/velocity';

const createDemoElement = (canvas: HTMLElement): HTMLElement => {
  canvas.innerHTML = '';
  const block = document.createElement('div');
  block.style.width = '84px';
  block.style.height = '84px';
  block.style.borderRadius = '16px';
  block.style.background = 'var(--accent)';
  block.style.display = 'grid';
  block.style.placeItems = 'center';
  block.style.color = '#fff';
  block.style.fontSize = '12px';
  block.style.fontWeight = '700';
  block.textContent = 'Demo';
  canvas.appendChild(block);
  return block;
};

export const runMotionLab = async (root: ParentNode, _reduced: boolean): Promise<void> => {
  const labRoot = root.querySelector('[data-motion-lab-root]');
  if (!(labRoot instanceof HTMLElement)) return;

  const canvas = labRoot.querySelector('[data-lab-canvas]');
  if (!(canvas instanceof HTMLElement)) return;

  const buttons = labRoot.querySelectorAll<HTMLButtonElement>('[data-lab-action]');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const action = button.dataset.labAction;
      if (!action) return;

      const block = createDemoElement(canvas);
      switch (action) {
        case 'waapi': {
          animateWithWAAPI(
            block,
            [
              { transform: 'translateX(0px) rotate(0deg)' },
              { transform: 'translateX(130px) rotate(180deg)' },
              { transform: 'translateX(0px) rotate(360deg)' },
            ],
            { duration: 1400, easing: 'ease-in-out' }
          );
          break;
        }
        case 'motion': {
          const { animate } = await loadMotion();
          animate(block, { transform: ['translateX(0px)', 'translateX(130px)', 'translateX(0px)'] }, { duration: 1.2 });
          break;
        }
        case 'anime': {
          const anime = await loadAnime();
          const runner = (anime as { animate?: Function }).animate;
          if (runner) {
            runner(block, { x: [0, 130, 0], rotate: 360, duration: 1200, easing: 'easeInOutSine' });
          }
          break;
        }
        case 'popmotion': {
          const pop = await loadPopmotion();
          pop.animate({
            from: 0,
            to: 130,
            duration: 1100,
            repeat: 1,
            repeatType: 'mirror',
            onUpdate: (value: number) => {
              block.style.transform = `translateX(${value}px)`;
            },
          });
          break;
        }
        case 'velocity': {
          const velocity = (await loadVelocity()) as unknown as (
            element: Element,
            properties: Record<string, string | number>,
            options: Record<string, string | number>
          ) => void;
          velocity(block, { translateX: 130, rotateZ: '180deg' }, { duration: 550 });
          velocity(block, { translateX: 0, rotateZ: '360deg' }, { duration: 550 });
          break;
        }
        case 'mojs': {
          const mojs = await loadMojs();
          const Burst = (mojs as unknown as { Burst?: new (...args: unknown[]) => { replay: () => void } })
            .Burst;
          if (Burst) {
            const burst = new Burst({
              parent: canvas,
              radius: { 10: 55 },
              count: 10,
              children: {
                shape: 'line',
                stroke: '#2f6e69',
                scale: { 1: 0 },
                duration: 850,
              },
            });
            burst.replay();
          }
          break;
        }
        case 'lottie': {
          await loadLottie();
          canvas.innerHTML = '';
          const message = document.createElement('p');
          message.className = 'text-muted text-sm';
          message.textContent = 'Lottie engine loaded. Add a JSON file in /public/lottie/ and wire it in lottie.ts.';
          canvas.appendChild(message);
          break;
        }
        case 'three': {
          await runThreeMiniScene(canvas);
          break;
        }
      }
    });
  });
};
