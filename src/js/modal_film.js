(() => {
    const refs = {
      openModalBtn: document.querySelectorAll("[data-film-open]"),
      closeModalBtn: document.querySelector("[data-film-close]"),
      modal: document.querySelector("[data-film]"),
    };
  
    refs.openModalBtn.forEach(btn => {btn.addEventListener("click", toggleModal)});
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      document.body.classList.toggle("film-open")
      refs.modal.classList.toggle("is-hidden");
    }
  })();


  