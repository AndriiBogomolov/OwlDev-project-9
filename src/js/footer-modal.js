const refs = {
  openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
  closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
  lightboxFooterModal: document.querySelector('.js-lightbox'),
};

//------------------відкриття модалки--------------------------
refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  refs.lightboxFooterModal.classList.remove('visually-hidden');
}
//-----------------закриття модалки через кнопку----------------
refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.lightboxFooterModal.classList.add('visually-hidden');
}
