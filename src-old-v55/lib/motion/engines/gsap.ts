import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type { ScrollToPlugin as ScrollToPluginType } from 'gsap/ScrollToPlugin';
import { loadCached } from '../core/loader';

type GSAPPayload = {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof ScrollTriggerType;
  ScrollToPlugin: typeof ScrollToPluginType;
};

export const loadGSAP = async (): Promise<GSAPPayload> =>
  loadCached('engine:gsap', async () => {
    const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/ScrollToPlugin'),
    ]);
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    return { gsap, ScrollTrigger, ScrollToPlugin };
  });
