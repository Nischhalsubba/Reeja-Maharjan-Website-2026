export const bindTiltCards = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-tilt-card]'));
  if (!cards.length) return;
  const isHome = root.querySelector('main[data-page="home"]') instanceof HTMLElement;

  cards.forEach((card) => {
    const reset = () => {
      card.style.transform = '';
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    };

    if (reduced) {
      card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
      card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
      return;
    }

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const maxRx = isHome ? 4 : 6;
      const maxRy = isHome ? 5.5 : 8;
      const lift = isHome ? 1.25 : 2;
      const rx = (0.5 - y) * maxRx;
      const ry = (x - 0.5) * maxRy;

      card.style.setProperty('--mx', `${Math.round(x * 100)}%`);
      card.style.setProperty('--my', `${Math.round(y * 100)}%`);
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-${lift}px)`;
    });

    card.addEventListener('pointerenter', () => card.classList.add('is-hovered'));
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-hovered');
      reset();
    });
    card.addEventListener('blur', reset, true);
  });
};
