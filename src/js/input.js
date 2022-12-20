import fechMovieSearch from './fechMovieSearch'

const apiServise = new ApiServise();

let currentPage = 1;
let totalPages;
const pageRange = 2;

//(parrusVika) відмальовується сторінка при першому завантаженні
init();
//(parrusVika)
const refs = {
    searchForm: document.querySelector('.search-form'),
    btn: document.querySelector('.search-form__button'),
    cardList: document.querySelector('.card list'),
    gallery: document.querySelector('.container')
}

refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
    e.preventDefault();
    apiServise.query = e.currentTarget.elements.query.value;

    if (apiServise.query.trim() === '') {
        return 'Search result not successful. Enter the correct movie name and ';
    }

    clearGallery();
    clearInput(e);
    refs.cardList.innerHTML = '';

    // refs.preloader.classList.remove('done');
    apiServise.resetPage();
    currentPage = 1;
    searchFetch(); // (parrusVika) відтворення сторінки по результату пошуку
}

//ф-ція для очистки розмітки галереї
function clearGallery() {
    refs.gallery.innerHTML = '';
}

//ф-ція для очистки інпуту
function clearInput(e) {
    e.currentTarget.elements.query.value = '';
}

//ф-ція для рендеринга даних в галерею
function renderMarkup(results) {
    const destrResults = destructArray(results);
    refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(destrResults));
}
