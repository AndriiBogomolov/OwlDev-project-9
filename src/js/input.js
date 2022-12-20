import { } from "./fetchMovieSearch";
const apiServise = new ApiServise()

const API_KEY = 'e52c7d8699df589ec79fa44e6b7f6a0c';
const BASE_URL = 'https://api.themoviedb.org/';



const refs = {
    searchForm: document.querySelector('.search-form'),
    btn: document.querySelector('.search-form__button'),
    cardList: document.querySelector('.card list'),
    gallery: document.querySelector('.container')
}

refs.searchForm.addEventListener('submit', onSearchForm);

// function onSearchForm(e) {
//     e.preventDefault();
//     apiServise.query = e.currentTarget.elements.query.value;

//     if (fetch.query.trim() === '') {
//         return 'Search result not successful. Enter the correct movie name and ';
//     }

//     clearGallery();
//     clearInput(e);
//     refs.cardList.innerHTML = '';

//     refs.preloader.classList.remove('done');
//     apiServise.resetPage();
//     currentPage = 1;
//     searchFetch(); // (parrusVika) відтворення сторінки по результату пошуку
// }
// console.log(onSearchForm())
// ф - ція для очистки розмітки галереї
// function clearGallery() {
//     refs.gallery.innerHTML = '';
// }