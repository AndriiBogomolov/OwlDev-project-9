import {Notify} from 'notiflix';

(() => {  
    refs.modalOpen.forEach(btn => {btn.addEventListener("click", toggleModal)});
    refs.modalClose.addEventListener("click", toggleModal);
  
    function toggleModal() {
      document.body.classList.toggle("film-open")
      refs.modal.classList.toggle("is-hidden");
    }
})();

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "e52c7d8699df589ec79fa44e6b7f6a0c";

refs.modalOpen.addEventListener("click", onModalOpen);

function onModalOpen(evt) {
  const data = requestFullInfo().then((data) => fillingMurkup(data));
}

function requestFullInfo() {
  const filmId = refs.film.getAttribute(id);
  return fetch(`${BASE_URL}/${filmId}?api_key=${API_KEY}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch((er) =>
      Notify.failure("Sorry, something goes wrong. Please, try again")
    );
}

function fillingMurkup(obj) {
  const genres = obj.genres.map((genre) => genre.name).join(", ");

  refs.modalFilmImg.src = `https://image.tmdb.org/t/p/w500/${obj.poster_path}`;
  refs.modalFilmImg.alt = `${obj.title} poster`;
  refs.modalFilmTitle.textContent = obj.title;
  refs.modalFilmVote.textContent = obj.vote_average;
  refs.modalFilmVotes.textContent = obj.vote_count;
  refs.modalFilmPopularity.textContent = obj.popularity;
  refs.modalFilmOrigTitle.textContent = obj.original_title;
  refs.modalFilmDescription.textContent = obj.overview;
  refs.modalFilmGenre.textContent = genres;
}
