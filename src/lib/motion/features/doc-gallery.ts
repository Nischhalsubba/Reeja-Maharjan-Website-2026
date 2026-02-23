type DocState = {
  id: string;
  src: string;
  alt: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
};

export const bindDocGallery = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const gallery = root.querySelector<HTMLElement>('[data-doc-gallery]');
  if (!gallery) return;

  const filterButtons = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-doc-filter]'));
  const items = Array.from(gallery.querySelectorAll<HTMLElement>('[data-doc-item]'));
  const triggers = Array.from(gallery.querySelectorAll<HTMLElement>('[data-doc-trigger]'));
  const lightbox = root.querySelector<HTMLElement>('[data-doc-lightbox]') ?? document.querySelector<HTMLElement>('[data-doc-lightbox]');

  const docs: DocState[] = triggers
    .map((el) => {
      const category = (el.closest('[data-doc-item]') as HTMLElement | null)?.dataset.docCategory ?? '';
      const { docId, docSrc, docAlt, docTitle, docIssuer, docDate } = el.dataset;
      if (!docId || !docSrc || !docTitle) return null;
      return {
        id: docId,
        src: docSrc,
        alt: docAlt ?? docTitle,
        title: docTitle,
        issuer: docIssuer ?? '',
        date: docDate ?? '',
        category,
      };
    })
    .filter((d): d is DocState => d !== null);

  let currentList = docs;
  let currentIndex = 0;
  let lastFocusedTrigger: HTMLElement | null = null;

  const modalImage = lightbox?.querySelector<HTMLImageElement>('[data-doc-image]') ?? null;
  const modalTitle = lightbox?.querySelector<HTMLElement>('#doc-lightbox-title') ?? null;
  const modalMeta = lightbox?.querySelector<HTMLElement>('#doc-lightbox-meta') ?? null;
  const modalCloseButtons = lightbox ? Array.from(lightbox.querySelectorAll<HTMLElement>('[data-doc-close]')) : [];
  const modalPrev = lightbox?.querySelector<HTMLButtonElement>('[data-doc-prev]') ?? null;
  const modalNext = lightbox?.querySelector<HTMLButtonElement>('[data-doc-next]') ?? null;

  const syncFilter = (filter: string) => {
    filterButtons.forEach((button) => {
      const active = (button.dataset.docFilter ?? '') === filter;
      button.dataset.active = active ? 'true' : 'false';
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    items.forEach((item) => {
      const category = item.dataset.docCategory ?? '';
      const show = filter === 'All' || category === filter;
      item.hidden = !show;
    });

    currentList = docs.filter((doc) => filter === 'All' || doc.category === filter);
  };

  const renderModal = (doc: DocState) => {
    if (!lightbox || !modalImage || !modalTitle || !modalMeta) return;
    modalImage.src = doc.src;
    modalImage.alt = doc.alt;
    modalTitle.textContent = doc.title;
    modalMeta.textContent = `${doc.issuer}${doc.date ? ` · ${doc.date}` : ''}`;
    modalPrev && (modalPrev.disabled = currentList.length <= 1);
    modalNext && (modalNext.disabled = currentList.length <= 1);
  };

  const openModal = (docId: string, trigger: HTMLElement) => {
    if (!lightbox || !currentList.length) return;
    const index = currentList.findIndex((d) => d.id === docId);
    if (index < 0) return;
    currentIndex = index;
    lastFocusedTrigger = trigger;
    const current = currentList[currentIndex];
    if (!current) return;
    renderModal(current);
    lightbox.hidden = false;
    document.documentElement.classList.add('doc-modal-open');
    modalCloseButtons.find((el) => el instanceof HTMLButtonElement)?.focus();
  };

  const closeModal = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.documentElement.classList.remove('doc-modal-open');
    lastFocusedTrigger?.focus();
  };

  const stepModal = (delta: number) => {
    if (!currentList.length) return;
    currentIndex = (currentIndex + delta + currentList.length) % currentList.length;
    const current = currentList[currentIndex];
    if (!current) return;
    renderModal(current);
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => syncFilter(button.dataset.docFilter ?? 'All'));
  });
  syncFilter('All');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (!(lightbox instanceof HTMLElement)) return;
      const docId = (trigger as HTMLElement).dataset.docId;
      if (!docId) return;
      event.preventDefault();
      openModal(docId, trigger);
    });
    if (!reduced) {
      trigger.addEventListener('mouseenter', () => trigger.classList.add('is-hovered'));
      trigger.addEventListener('mouseleave', () => trigger.classList.remove('is-hovered'));
    }
  });

  modalCloseButtons.forEach((button) => button.addEventListener('click', closeModal));
  modalPrev?.addEventListener('click', () => stepModal(-1));
  modalNext?.addEventListener('click', () => stepModal(1));

  document.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') stepModal(-1);
    if (event.key === 'ArrowRight') stepModal(1);
  });
};
