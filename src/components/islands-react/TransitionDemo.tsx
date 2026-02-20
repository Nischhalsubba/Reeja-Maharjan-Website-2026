import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function TransitionDemo() {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="rounded-xl border border-[var(--border)] p-3">
      <button
        type="button"
        className="mb-3 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold"
        onClick={() => setOpen((prev) => !prev)}
      >
        Toggle transition
      </button>
      <CSSTransition in={open} timeout={220} classNames="rtg" unmountOnExit nodeRef={nodeRef}>
        <div ref={nodeRef} className="rounded-lg border border-[var(--border)] p-4 text-sm">
          React Transition Group island demo
        </div>
      </CSSTransition>
      <style>{`
        .rtg-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .rtg-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .rtg-exit {
          opacity: 1;
        }
        .rtg-exit-active {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 180ms ease, transform 180ms ease;
        }
      `}</style>
    </div>
  );
}
