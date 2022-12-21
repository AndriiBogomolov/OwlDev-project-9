import Notiflix from 'notiflix';
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
  }else {
    LocalStgWatchedData = JSON.parse(
      localStorage.getItem(LOCAL_STORGE_WATCHED)
    );
    let LocalStgData = LocalStgWatchedData;
    markupCard(LocalStgData);
    refs.watchedButton.addEventListener('click', onWatchedButton);
    refs.queueButton.addEventListener('click', onQueueButton);
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
  const filmImg = 'https://image.tmdb.org/t/p/w500/'
  const markup = LocalStgData.map(({ original_title, release_date, genre, id, poster_path, vote_count,vote_average
  }) => {
    const rating = Number(vote_count);
    return `
                <li class="gallery__item card-set" data-id="${id}">
        <div class="img-wrap">
          <img
            class="gallery__img"
            src="${filmImg}${poster_path}"
            alt="${original_title}}"
            loading="lazy"
          />
        </div>
        <div class="gallary-wrapper">
          <h2 class="gallery__title">${original_title}</h2>
          <div class="gallery__wrap">
            <p class="gallery__ganres">${genre} | ${release_date}</p>
            <p class="gallery__rating">${vote_average}</p>
          </div>
        </div>
      </li>`;
  }).join('');
  refs.galleryRef.innerHTML = markup;
}

export function addImgIfLocalStgEmpty() {
  refs.galleryRef.innerHTML =
    '<div class="img-emp"><h2 style="font-size: 17px; text-align: center; margin-bottom: 20px;">You have not chosen anything yet!</h2><img class="img-for-empty" style=" max-width: 704px; " src="https://kartinkin.net/pics/uploads/posts/2022-08/1660180902_1-kartinkin-net-p-fon-kinoteatr-krasivo-1.jpg" alt=" " loading="lazy"/></div>';
}
