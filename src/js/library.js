import Notiflix from 'notiflix';
import './fetchMovieTrailer';
import { onModalWindowOpen, onModalWindowClose, onBackdropClick, onEscClose } from './modal_film';
// import { markupCard } from '../watched-queue/watched-queue-markup';

Notiflix.Notify.init({
  clickToClose: true,
});

const LOCAL_STORGE_WATCHED = 'watch';
const LOCAL_STORGE_QUEUE = 'queue';
let LocalStgWatchedData = [];
let LocalStgQueueData = [];

const refs = {
  libraryCurrent: document.querySelector('#library-link'),
  galleryRef: document.querySelector('.gallery'),
  watchedButton: document.querySelector('.btn-watch'),
  queueButton: document.querySelector('.btn-queue'),
};

console.log(refs);

currentPageCheck();

function currentPageCheck() {
  if (!refs.libraryCurrent.classList.contains('nav__link--current')) {
    return;
  } else if (
    localStorage.getItem(LOCAL_STORGE_WATCHED) === null ||
    JSON.parse(localStorage.getItem(LOCAL_STORGE_WATCHED)).length === 0
  ) {
    console.log('Перевірка при завантажені', LocalStgWatchedData);
    Notiflix.Notify.failure('There are no films in WATCHED !');
    addImgIfLocalStgEmpty();

    refs.queueButton.addEventListener('click', onQueueButton);
  } else {
    LocalStgWatchedData = JSON.parse(
      localStorage.getItem(LOCAL_STORGE_WATCHED)
    );
    let LocalStgData = LocalStgWatchedData;
    markupCard(LocalStgData);
    console.log(LocalStgData);
    refs.watchedButton.addEventListener('click', onWatchedButton);
    refs.queueButton.addEventListener('click', onQueueButton);
    refs.galleryRef.addEventListener('click', onModalWindowOpen);
  }
}

function onWatchedButton() {
  // refs.galleryRef.innerHTML = '';
  refs.watchedButton.classList.add('btn-active');
  refs.queueButton.classList.remove('btn-active');
  if (
    localStorage.getItem(LOCAL_STORGE_WATCHED) == null ||
    JSON.parse(localStorage.getItem(LOCAL_STORGE_WATCHED)).length == 0
  ) {
    Notiflix.Notify.failure('There are no films in WATCHED !');
    addImgIfLocalStgEmpty();
    return;
  }
  LocalStgWatchedData = JSON.parse(localStorage.getItem(LOCAL_STORGE_WATCHED));
  let LocalStgData = LocalStgWatchedData;
  markupCard(LocalStgData);
}

function onQueueButton() {
  refs.watchedButton.classList.remove('btn-active');
  refs.queueButton.classList.add('btn-active');
  if (
    localStorage.getItem(LOCAL_STORGE_QUEUE) == null ||
    JSON.parse(localStorage.getItem(LOCAL_STORGE_QUEUE)).length == 0
  ) {
    refs.galleryRef.innerHTML = '';
    Notiflix.Notify.failure('There are no films in Queue !');
    addImgIfLocalStgEmpty();
    refs.watchedButton.addEventListener('click', onWatchedButton);
    return;
  }
  LocalStgQueueData = JSON.parse(localStorage.getItem(LOCAL_STORGE_QUEUE));
  let LocalStgData = LocalStgQueueData;
  console.log(LocalStgData);

  if (
    localStorage.getItem(LOCAL_STORGE_WATCHED) == null ||
    JSON.parse(localStorage.getItem(LOCAL_STORGE_WATCHED)).length == 0
  ) {
    console.log(
      'onWatchedButton всередині функції onQUEUE',
      localStorage.getItem(LOCAL_STORGE_WATCHED)
    );
    addImgIfLocalStgEmpty();
    refs.watchedButton.addEventListener('click', onWatchedButton);
  }
  markupCard(LocalStgData);
}

export function markupCard(LocalStgData) {
  const filmImg = 'https://image.tmdb.org/t/p/w500/';
  const markup = LocalStgData.map(
    ({
      original_title,
      release_date,
      genres: {name: genre},
      id,
      poster_path,
      vote_average,
    }) => {
      let year = new Date(release_date);
      let yearRelease = year.getFullYear();
      return `<li class="card__item item">
      <a class="card__link link" href="#" id="${id}" data-id="${id}" data-film-open>
        <div class="card__thumb">
          <img class="card__img"                      
            sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"
            src='${filmImg}${poster_path}'
            alt="tehnocryak"
            width="100%"
            class="card__img"
          />
        </div>
        <div class="card__meta">
          <h2 class="card__title">${original_title}</h2>
          <p class="card__info">${genre} | ${yearRelease} <span class="vote">${vote_average}</span></p>
        </div>
      </a>
    </li>`
    }
  ).join('');
  refs.galleryRef.innerHTML = markup;
}

export function addImgIfLocalStgEmpty() {
  refs.galleryRef.innerHTML =
    '<div class="img-emp"><h2 style="font-size: 17px; text-align: center; margin-bottom: 20px;">You have not chosen anything yet!</h2><img class="img-for-empty" style=" max-width: 704px; " src="https://kartinkin.net/pics/uploads/posts/2022-08/1660180902_1-kartinkin-net-p-fon-kinoteatr-krasivo-1.jpg" alt=" " loading="lazy"/></div>';
}
