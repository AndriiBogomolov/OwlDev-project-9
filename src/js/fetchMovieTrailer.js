import * as basicLightbox from 'basiclightbox';
import { refs } from './refs';
import { API_KEY, BASE_URL } from './api-service';
import { Notify } from 'notiflix';

refs.modalTrailerWatch.addEventListener('click', onTrailerOpen);

function onTrailerOpen(e) {
  e.preventDefault();
  const filmId = refs.modalFilmId.textContent;
  createTrailerLink(filmId);
}

function trailerRequest(filmId) {
  return fetch(`${BASE_URL}/movie/${filmId}/videos?api_key=${API_KEY}`)
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

function createTrailerLink(filmId) {
  trailerRequest(filmId).then(data => {
    if (data.results.length === 0) {
      return;
    } else {
      const trailer = data.results.filter(obj => {
        if (!obj.official) {
          return data.results[0].key;
        }
        return obj.official;
      });
      const key = trailer[0].key;

      const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${key}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `);
      instance.show();
      trailerBtnClose(instance);
    }
  });
}

function trailerBtnClose(instance) {
  const trailerModal = document.querySelector('.basicLightbox--iframe');
  trailerModal.insertAdjacentHTML(
    'afterbegin',
    `<button
        type="button"
        class="modal-film__btn trailer-btn"
        data-trailer-close
        >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
        </svg>
        </button>
    `
  );
  const trailerCloseBtn = document.querySelector('[data-trailer-close]');
  trailerCloseBtn.addEventListener('click', trailerModal => {
    instance.close();
  });
}
