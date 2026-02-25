type LightboxItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  issuer: string;
  date: string;
  category?: string;
  group: string;
  rotateDeg: number;
};

const normalizeRotation = (value?: string): number => {
  if (!value) return 0;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  const normalized = ((Math.round(parsed / 90) * 90) % 360 + 360) % 360;
  return normalized;
};

const toLightboxItem = (el: HTMLElement): LightboxItem | null => {
  const id = el.dataset.docId ?? el.dataset.lightboxId;
  const src = el.dataset.docSrc ?? el.dataset.lightboxSrc;
  const title = el.dataset.docTitle ?? el.dataset.lightboxTitle;
  if (!id || !src || !title) return null;

  const category = (el.closest('[data-doc-item]') as HTMLElement | null)?.dataset.docCategory ?? '';

  return {
    id,
    src,
    alt: el.dataset.docAlt ?? el.dataset.lightboxAlt ?? title,
    title,
    issuer: el.dataset.docIssuer ?? el.dataset.lightboxIssuer ?? '',
    date: el.dataset.docDate ?? el.dataset.lightboxDate ?? '',
    category: category || undefined,
    group: el.dataset.lightboxGroup ?? (el.hasAttribute('data-doc-trigger') ? 'documents' : 'misc'),
    rotateDeg: normalizeRotation(el.dataset.docRotate ?? el.dataset.lightboxRotate),
  };
};

export const bindDocGallery = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const gallery = root.querySelector<HTMLElement>('[data-doc-gallery]');
  const lightbox = document.querySelector<HTMLElement>('[data-doc-lightbox]');
  const docTriggers = Array.from(root.querySelectorAll<HTMLElement>('[data-doc-trigger]'));
  const genericTriggers = Array.from(root.querySelectorAll<HTMLElement>('[data-lightbox-trigger]:not([data-doc-trigger])'));

  if (!gallery && !lightbox) return;

  const filterButtons = gallery
    ? Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-doc-filter]'))
    : [];
  const items = gallery
    ? Array.from(gallery.querySelectorAll<HTMLElement>('[data-doc-item]'))
    : [];

  const allTriggerEls = [...docTriggers, ...genericTriggers];

  const docs = docTriggers
    .map((el) => toLightboxItem(el))
    .filter((item): item is LightboxItem => item !== null);

  let currentList: LightboxItem[] = docs;
  let currentIndex = 0;
  let currentRotation = 0;
  let lastFocusedTrigger: HTMLElement | null = null;

  const modalImage = lightbox?.querySelector<HTMLImageElement>('[data-doc-image]') ?? null;
  const modalTitle = lightbox?.querySelector<HTMLElement>('#doc-lightbox-title') ?? null;
  const modalMeta = lightbox?.querySelector<HTMLElement>('#doc-lightbox-meta') ?? null;
  const modalKicker = lightbox?.querySelector<HTMLElement>('#doc-lightbox-kicker') ?? null;
  const modalRotationValue = lightbox?.querySelector<HTMLElement>('[data-doc-rotation-value]') ?? null;
  const modalCloseButtons = lightbox ? Array.from(lightbox.querySelectorAll<HTMLElement>('[data-doc-close]')) : [];
  const modalPrev = lightbox?.querySelector<HTMLButtonElement>('[data-doc-prev]') ?? null;
  const modalNext = lightbox?.querySelector<HTMLButtonElement>('[data-doc-next]') ?? null;
  const rotateLeft = lightbox?.querySelector<HTMLButtonElement>('[data-doc-rotate-left]') ?? null;
  const rotateRight = lightbox?.querySelector<HTMLButtonElement>('[data-doc-rotate-right]') ?? null;
  const rotateReset = lightbox?.querySelector<HTMLButtonElement>('[data-doc-rotate-reset]') ?? null;

  const updateRotationDisplay = () => {
    if (!modalImage) return;
    modalImage.style.transform = `rotate(${currentRotation}deg)`;
    modalImage.style.transformOrigin = 'center center';
    modalRotationValue && (modalRotationValue.textContent = `${currentRotation}°`);
  };

  const setRotation = (deg: number) => {
    currentRotation = ((deg % 360) + 360) % 360;
    updateRotationDisplay();
  };

  const syncFilter = (filter: string) => {
    if (!gallery) return;
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

  const getGroupListForTrigger = (trigger: HTMLElement): LightboxItem[] => {
    if (trigger.hasAttribute('data-doc-trigger')) {
      return currentList.length ? currentList : docs;
    }

    const group = trigger.dataset.lightboxGroup ?? 'misc';
    const grouped = genericTriggers
      .filter((el) => (el.dataset.lightboxGroup ?? 'misc') === group)
      .map((el) => toLightboxItem(el))
      .filter((item): item is LightboxItem => item !== null);

    return grouped.length ? grouped : [toLightboxItem(trigger)].filter((item): item is LightboxItem => item !== null);
  };

  const renderModal = (doc: LightboxItem) => {
    if (!lightbox || !modalImage || !modalTitle || !modalMeta) return;
    modalImage.src = doc.src;
    modalImage.alt = doc.alt;
    modalTitle.textContent = doc.title;
    modalMeta.textContent = `${doc.issuer}${doc.date ? ` · ${doc.date}` : ''}`;
    if (modalKicker) {
      modalKicker.textContent = doc.category ? `${doc.category} Preview` : 'Image Preview';
    }
    modalPrev && (modalPrev.disabled = currentList.length <= 1);
    modalNext && (modalNext.disabled = currentList.length <= 1);
    setRotation(doc.rotateDeg);
  };

  const openModal = (docId: string, trigger: HTMLElement) => {
    if (!lightbox) return;
    const list = getGroupListForTrigger(trigger);
    if (!list.length) return;
    currentList = list;
    const index = currentList.findIndex((d) => d.id === docId);
    if (index < 0) return;
    currentIndex = index;
    lastFocusedTrigger = trigger;
    const current = currentList[currentIndex];
    if (!current) return;
    renderModal(current);
    lightbox.hidden = false;
    document.documentElement.classList.add('doc-modal-open');
    (modalCloseButtons.find((el) => el instanceof HTMLButtonElement) as HTMLButtonElement | undefined)?.focus();
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

  const bindTrigger = (trigger: HTMLElement) => {
    const handleActivate = (event: Event) => {
      if (!(lightbox instanceof HTMLElement)) return;
      const docId = trigger.dataset.docId ?? trigger.dataset.lightboxId;
      if (!docId) return;
      if (event instanceof MouseEvent || event instanceof PointerEvent) event.preventDefault();
      openModal(docId, trigger);
    };

    trigger.addEventListener('click', handleActivate);
    if (!reduced) {
      trigger.addEventListener('mouseenter', () => trigger.classList.add('is-hovered'));
      trigger.addEventListener('mouseleave', () => trigger.classList.remove('is-hovered'));
    }

    const tag = trigger.tagName;
    if (tag !== 'A' && tag !== 'BUTTON') {
      trigger.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        handleActivate(event);
      });
    }
  };

  if (gallery) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => syncFilter(button.dataset.docFilter ?? 'All'));
    });
    syncFilter('All');
  }

  allTriggerEls.forEach(bindTrigger);

  modalCloseButtons.forEach((button) => button.addEventListener('click', closeModal));
  modalPrev?.addEventListener('click', () => stepModal(-1));
  modalNext?.addEventListener('click', () => stepModal(1));
  rotateLeft?.addEventListener('click', () => setRotation(currentRotation - 90));
  rotateRight?.addEventListener('click', () => setRotation(currentRotation + 90));
  rotateReset?.addEventListener('click', () => {
    const current = currentList[currentIndex];
    setRotation(current?.rotateDeg ?? 0);
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') stepModal(-1);
    if (event.key === 'ArrowRight') stepModal(1);
    if (event.key === 'q' || event.key === 'Q') setRotation(currentRotation - 90);
    if (event.key === 'e' || event.key === 'E') setRotation(currentRotation + 90);
    if (event.key === '0') {
      const current = currentList[currentIndex];
      setRotation(current?.rotateDeg ?? 0);
    }
  });
};
