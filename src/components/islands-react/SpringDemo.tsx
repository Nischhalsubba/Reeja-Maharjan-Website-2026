import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

export default function SpringDemo() {
  const [active, setActive] = useState(false);
  const spring = useSpring({
    transform: active ? 'translateY(-6px) scale(1.02)' : 'translateY(0px) scale(1)',
    backgroundColor: active ? '#d8ebe9' : '#ffffff',
    config: { tension: 240, friction: 20 },
  });

  return (
    <div className="rounded-xl border border-[var(--border)] p-3">
      <button
        type="button"
        className="mb-3 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold"
        onClick={() => setActive((prev) => !prev)}
      >
        Toggle spring
      </button>
      <animated.div style={spring} className="rounded-lg border border-[var(--border)] p-4 text-sm">
        react-spring island demo
      </animated.div>
    </div>
  );
}
