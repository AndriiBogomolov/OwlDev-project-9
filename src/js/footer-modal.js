const refs = {
  openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
  closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
  lightboxFooterModal: document.querySelector('.js-lightbox'),
  body: document.querySelector('[data-page]'),
};

//------------------відкриття модалки--------------------------
refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  refs.lightboxFooterModal.classList.remove('visually-hidden');
  refs.body.classList.add('on-scroll');
}
//-----------------закриття модалки через кнопку----------------
refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.lightboxFooterModal.classList.add('visually-hidden');
}
