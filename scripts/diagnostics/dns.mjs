import { resolve4, resolve6, resolveCname, resolveNs } from 'node:dns/promises';

const safeResolve = async (resolver, hostname) => {
  try {
    return await resolver(hostname);
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
};

export async function inspectDns(hostname) {
  return {
    hostname,
    a: await safeResolve(resolve4, hostname),
    aaaa: await safeResolve(resolve6, hostname),
    cname: await safeResolve(resolveCname, hostname),
    nameservers: await safeResolve(resolveNs, hostname)
  };
}
