import refs from './refs';
// import movieMarkup from '../templates/movie-card';
import ApiServise from './api-service';
//импорт toastr notification
import toastr from 'toastr';
// import 'toastr/build/toastr.css';
//настройи toastr notification
toastr.options = {
    closeButton: false,
    debug: true,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-center',
    preventDuplicates: true,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '3000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};

const apiServise = new ApiServise();

//  (Ihor) объявление переменных и ссылок для пагинации
let currentPage = 1;
let totalPages;
const pageRange = 2;

init(); //(Ihor)  отрисовка страницы при первой загрузке

refs.searchForm.addEventListener('submit', onSearchForm);

//ф-ция для изменения данных, приходящих с бэка
function match(arr) {
    const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
    return arr.map(el => {
        for (let i = 0; i < el.genre_ids.length; i++) {
            if (findGenre(el.genre_ids[i])) {
                el.genre_ids[i] = ` ${findGenre(el.genre_ids[i])}`;
                if (el.genre_ids.length > 2) {
                    el.genre_ids.splice(2, 5, ' Other');
                }
            } else {
                el.genre_ids[i] = ' Other genre';
                if (el.genre_ids.length > 2) {
                    el.genre_ids.splice(2, 5, ' Other');
                }
            }
        }
        if (el.release_date) {
            el.release_date = el.release_date.slice(0, 4);
        } else if (el.first_air_date) {
            el.release_date = el.first_air_date.slice(0, 4);
        }
        if (!el.original_title) {
            el.original_title = el.name;
        }
        if (el.poster_path) {
            el.poster_path = IMG_PATH + el.poster_path;
        } else {
            el.poster_path = 'https://w.zhinka.tv/templates/Default/dleimages/no_image.jpg';
        }
        return el;
    });
}

//ф-ция для поиска жанров по айди
function findGenre(el) {
    const genresBD = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' },
    ];
    let result;

    genresBD.forEach(genre => {
        if (el == genre.id) {
            result = genre.name;
        }
    });

    return result;
}

//ф-ция отправки запроса на апи
function onSearchForm(e) {
    e.preventDefault();
    apiServise.query = e.currentTarget.elements.query.value;

    if (apiServise.query.trim() === '') {
        return toastr.warning('Пожалуйста, введите ваш запроc');
    }

    clearGallery();
    clearInput(e);
    refs.pageList.innerHTML = '';

    refs.preloader.classList.remove('done');
    apiServise.resetPage();
    currentPage = 1;
    searchFetch(); // (Ihor) отрисовка страницы по результату поиска
}

//ф-ция для очистки разметки галлереи
function clearGallery() {
    refs.gallery.innerHTML = '';
}

//ф-ция для очистки инпута
function clearInput(e) {
    e.currentTarget.elements.query.value = '';
}

//ф-ция для рендеринга данных в галлерею
function renderMarkup(results) {
    const destrResults = destructArray(results);
    refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(destrResults));
}

//ф-ция для изменения массива, приходящего с бека
function destructArray(arr) {
    return arr.map(
        ({
            first_air_date,
            id,
            name,
            backdrop_path,
            original_title,
            genre_ids,
            poster_path,
            release_date,
        }) => ({
            first_air_date,
            id,
            name,
            backdrop_path,
            original_title,
            genre_ids,
            poster_path,
            release_date,
            dataMovie: JSON.stringify({
                first_air_date,
                id,
                name,
                backdrop_path,
                original_title,
                genre_ids,
                poster_path,
                release_date,
            }),
        }),
    );
}

//ф-ция для отображения загрузчика
function preloader() {
    if (!refs.preloader.classList.contains('done')) {
        refs.preloader.classList.add('done');
    }
}

//           (Ihor) Код пагинации

function searchFetch() {
    // (Ihor) обработка ответа API по результату поиска и отрисовка страницы
    apiServise
        .fetchMoviesByRequest()
        .then(data => {
            totalPages = data.total_pages;
            refs.lastBtn.textContent = totalPages;
            // console.log(data)
            init();
            return data.results;
        })
        .then(results => {
            if (results.length < 1) {
                toastr.error('Фильм не найден! Измените ввод и повторите попытку');
                apiServise.query = '';
                fetchGall();
            }
            renderMarkup(match(destructArray(results)));
            setTimeout(preloader, 200);
        })

        .catch(error => console.log(error));
}
// (Ihor) обработка ответа API по умолчанию(популярные фильмы) и отрисовка страницы
function fetchGall() {
    apiServise
        .fetchPopularMovies()
        .then(data => {
            totalPages = data.total_pages;
            refs.lastBtn.textContent = totalPages;
            // console.log(data)
            init();
            return data.results;
        })
        .then(results => {
            renderMarkup(match(destructArray(results)));
            setTimeout(preloader, 200);
        })

        .catch(error => console.log(error));
}

refs.paginationList.addEventListener('click', onBtnClick);
refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

// (Ihor) изменение нумерации при клике на кнопки с цифрами
function onBtnClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'BUTTON') {
        return;
    }

    refs.gallery.innerHTML = '';
    refs.pageList.innerHTML = '';

    currentPage = Number(evt.target.textContent);
    apiServise.pagination(currentPage);
    scrollContent();

    if (apiServise.query) {
        searchFetch();
    } else {
        fetchGall();
    }
}

// (Ihor) изменение нумерации на 1 при клике на кнопку Prev
function onPrevBtnClick(evt) {
    evt.preventDefault();

    if (currentPage > 1) {
        currentPage -= 1;
    }
    refs.gallery.innerHTML = '';
    refs.pageList.innerHTML = '';
    apiServise.pagination(currentPage);
    scrollContent();

    if (apiServise.query) {
        searchFetch();
    } else {
        fetchGall();
    }
}

// (Ihor) изменение нумерации на 1 при клике на кнопку Next
function onNextBtnClick(evt) {
    evt.preventDefault();

    if (currentPage !== totalPages) {
        currentPage += 1;
    }
    refs.gallery.innerHTML = '';
    refs.pageList.innerHTML = '';
    apiServise.pagination(currentPage);
    scrollContent();

    if (apiServise.query) {
        searchFetch();
    } else {
        fetchGall();
    }
}

// (Ihor) динамически рендерится список кнопок
function renderPagesList() {
    const start = currentPage - pageRange;
    const end = currentPage + pageRange;

    for (let i = start; i <= end; i += 1) {
        if (i > 0 && i <= totalPages) {
            refs.pageList.insertAdjacentHTML(
                'beforeend',
                `<li class="pages-item"><button type="button" class="pagination-btn">${i}</button></li>`,
            );
        }
    }
}

// (Ihor) скрывает и показывает первую и последнюю кнопки
function hideFirstLastBtn() {
    currentPage < 4 ? (refs.firstPage.hidden = true) : (refs.firstPage.hidden = false);
    currentPage > totalPages - 3 ? (refs.lastPage.hidden = true) : (refs.lastPage.hidden = false);
}

// (Ihor) делает неактивными кнопки-стрелки
function checkBtnOpacity() {
    currentPage === 1 ? (refs.prevBtn.disabled = true) : (refs.prevBtn.disabled = false);
    currentPage === totalPages ? (refs.nextBtn.disabled = true) : (refs.nextBtn.disabled = false);
}

// (Ihor) делает активную кнопку
function makeActiveBtn() {
    let pagesMenu = refs.pageList.querySelectorAll('button');
    for (let i = 0; i < pagesMenu.length; i += 1) {
        if (Number(pagesMenu[i].textContent) === currentPage) {
            pagesMenu[i].classList.add('active-btn');
        }
    }
}

//(Ihor) делает плавный скролл на начало страницы при пагинации
function scrollContent() {
    refs.header.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function init() {
    checkBtnOpacity();
    hideFirstLastBtn();
    renderPagesList();
    makeActiveBtn();
}

// console.log(currentPage)
apiServise.pagination(currentPage);
fetchGall();