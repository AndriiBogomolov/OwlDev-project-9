import renderList from './popular-films';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { API_KEY } from './api-service';
import { BASE_URL } from './api-service';

const inputElement = document.querySelector('input');
const btnElement = document.querySelector('button');

class ApiServise {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    return fetch(url).then(response => response.json());
  }
  fetchMoviesByRequest() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    return fetch(url).then(response => response.json());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  clearInput() {
    this.searchQuery.innerHTML = '';
  }

  pagination(el) {
    this.page = el;
  }
}

const apiServise = new ApiServise();

let currentPage = 1;
let totalPages;
const pageRange = 2;

btnElement.addEventListener('click', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  apiServise.query = inputElement.value.trim();

  if (apiServise.query.trim() === '') {
    Notiflix.Notify.failure('Please enter the text in search field');
    return;
  }

  clearGallery();
  inputElement.value = '';
  refs.pageList.innerHTML = '';
  apiServise.resetPage();
  currentPage = 1;
  searchFetch();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function searchFetch() {
  apiServise
    .fetchMoviesByRequest()
    .then(data => {
      console.log(data);
      if (data.total_results == 0) {
        Notiflix.Notify.failure(
          '"Sorry, there are no film with this name. Please try again."'
        );
        apiServise.query = '';
        fetchGall();
      }
      totalPages = data.total_pages;
      refs.lastBtn.textContent = totalPages;
      // console.log(data)
      renderList(data);
      init();
    })
    .catch(error => console.log(error));
}

function fetchGall() {
  apiServise
    .fetchPopularMovies()
    .then(data => {
      totalPages = data.total_pages;
      refs.lastBtn.textContent = totalPages;

      init();
      renderList(data);
    })
    .catch(error => console.log(error));
}

refs.paginationList.addEventListener('click', onBtnClick);
refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  refs.gallery.innerHTML = '';
  refs.pageList.innerHTML = '';

  currentPage = Number(evt.target.textContent);
  apiServise.pagination(currentPage);

  if (apiServise.query) {
    searchFetch();
  } else {
    fetchGall();
  }
}

function onPrevBtnClick(evt) {
  evt.preventDefault();

  if (currentPage > 1) {
    currentPage -= 1;
  }
  refs.gallery.innerHTML = '';
  refs.pageList.innerHTML = '';
  apiServise.pagination(currentPage);

  if (apiServise.query) {
    searchFetch();
  } else {
    fetchGall();
  }
}

function onNextBtnClick(evt) {
  evt.preventDefault();

  if (currentPage !== totalPages) {
    currentPage += 1;
  }
  refs.gallery.innerHTML = '';
  refs.pageList.innerHTML = '';
  apiServise.pagination(currentPage);

  if (apiServise.query) {
    searchFetch();
  } else {
    fetchGall();
  }
}

function renderPagesList() {
  const start = currentPage - pageRange;
  const end = currentPage + pageRange;

  for (let i = start; i <= end; i += 1) {
    if (i > 0 && i <= totalPages) {
      refs.pageList.insertAdjacentHTML(
        'beforeend',
        `<li class="pages-item"><button type="button" class="pagination-btn">${i}</button></li>`
      );
    }
  }
}

function hideFirstLastBtn() {
  currentPage < 4
    ? (refs.firstPage.hidden = true)
    : (refs.firstPage.hidden = false);
  currentPage > totalPages - 3
    ? (refs.lastPage.hidden = true)
    : (refs.lastPage.hidden = false);
}

function checkBtnOpacity() {
  currentPage === 1
    ? (refs.prevBtn.disabled = true)
    : (refs.prevBtn.disabled = false);
  currentPage === totalPages
    ? (refs.nextBtn.disabled = true)
    : (refs.nextBtn.disabled = false);
}

function makeActiveBtn() {
  let pagesMenu = refs.pageList.querySelectorAll('button');
  for (let i = 0; i < pagesMenu.length; i += 1) {
    if (Number(pagesMenu[i].textContent) === currentPage) {
      pagesMenu[i].classList.add('active-btn');
    }
  }
}

function init() {
  checkBtnOpacity();
  hideFirstLastBtn();
  renderPagesList();
  makeActiveBtn();
}

apiServise.pagination(currentPage);
fetchGall();
