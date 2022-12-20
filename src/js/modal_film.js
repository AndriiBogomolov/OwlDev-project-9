import { refs } from './refs';
import { API_KEY, BASE_URL } from './api-service';
import { Notify } from 'notiflix';



const movieList = document.querySelector('.card');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

movieList.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  if (!e.target.closest('li')) {   
    return;
  } else if (e.target.closest('li')) {
    
    const filmId = e.target.closest('a').getAttribute('id');    
    requestFullInfo(filmId).then(data => fillingMurkup(data));


    document.body.style.overflow = 'hidden';
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscClose);
  }
}

function onModalWindowClose() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
}

function requestFullInfo(filmId) {
  return fetch(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(er =>
      Notify.failure('Sorry, something goes wrong. Please, try again')
    );
}


function fillingMurkup(obj) {
  const genres = obj.genres.map(genre => genre.name).join(', ');

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

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onModalWindowClose();
  }
}

function onEscClose(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onEscClose);
    onModalWindowClose();
  }
}

export { onModalWindowOpen, onModalWindowClose, onBackdropClick, onEscClose };
