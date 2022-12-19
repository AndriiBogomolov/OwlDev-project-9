const refs = {
  openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
  closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
  lightboxFooterModal: document.querySelector('.js-lightbox'),
  backdropClick: document.querySelector('.lightbox'),
  //main: document.querySelector('main'),
};

//------------------відкриття модалки--------------------------
refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  window.addEventListener('keydown', onEscClick); // додавання слухача події на Esc
  refs.lightboxFooterModal.classList.remove('visually-hidden');
  //refs.main.classList.add('on-scroll'); //блокування скролу
}
//-----------------закриття модалки через кнопку----------------
refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  window.removeEventListener('keydown', onEscClick); //зняття слухача події на Esc
  refs.lightboxFooterModal.classList.add('visually-hidden');
  //refs.main.classList.remove('on-scroll'); // зняття блокування скролу
}
//-------------закриття через бекдроп--------------------------
refs.backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
//--------закриття через Esc----------------------------------
function onEscClick(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
