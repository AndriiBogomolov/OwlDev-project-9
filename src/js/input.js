// import ApiServise from './fetchMovieSearch';
// // import toastr from 'toastr';
// // import refs from './refs';
// // console.log(toastr)
// const apiServise = new ApiServise();
// console.log(apiServise);

// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.container');
// const input = document.querySelector('.search-form__input');
// const btn = document.querySelector('.search-form__button');

// // console.log(btn)
// let currentPage = 1;
// let totalPages;
// const pageRange = 2;
// // init();

// searchForm.addEventListener('submit', onSearchForm);

// function match(arr) {
//   const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
//   return arr.map(el => {
//     for (let i = 0; i < el.genre_ids.length; i++) {
//       if (findGenre(el.genre_ids[i])) {
//         el.genre_ids[i] = ` ${findGenre(el.genre_ids[i])}`;
//         if (el.genre_ids.length > 2) {
//           el.genre_ids.splice(2, 5, ' Other');
//         }
//       } else {
//         el.genre_ids[i] = ' Other genre';
//         if (el.genre_ids.length > 2) {
//           el.genre_ids.splice(2, 5, ' Other');
//         }
//       }
//     }
//     if (el.release_date) {
//       el.release_date = el.release_date.slice(0, 4);
//     } else if (el.first_air_date) {
//       el.release_date = el.first_air_date.slice(0, 4);
//     }
//     if (!el.original_title) {
//       el.original_title = el.name;
//     }
//     if (el.poster_path) {
//       el.poster_path = IMG_PATH + el.poster_path;
//     } else {
//       el.poster_path =
//         'https://w.zhinka.tv/templates/Default/dleimages/no_image.jpg';
//     }
//     return el;
//   });
// }

// function findGenre(el) {
//   const genresBD = [
//     { id: 28, name: 'Action' },
//     { id: 12, name: 'Adventure' },
//     { id: 16, name: 'Animation' },
//     { id: 35, name: 'Comedy' },
//     { id: 80, name: 'Crime' },
//     { id: 99, name: 'Documentary' },
//     { id: 18, name: 'Drama' },
//     { id: 10751, name: 'Family' },
//     { id: 14, name: 'Fantasy' },
//     { id: 36, name: 'History' },
//     { id: 27, name: 'Horror' },
//     { id: 10402, name: 'Music' },
//     { id: 9648, name: 'Mystery' },
//     { id: 10749, name: 'Romance' },
//     { id: 878, name: 'Science Fiction' },
//     { id: 10770, name: 'TV Movie' },
//     { id: 53, name: 'Thriller' },
//     { id: 10752, name: 'War' },
//     { id: 37, name: 'Western' },
//   ];
//   let result;

//   genresBD.forEach(genre => {
//     if (el == genre.id) {
//       result = genre.name;
//     }
//   });

//   return result;
// }

// function onSearchForm(e) {
//   e.preventDefault();
//   apiServise.query = e.currentTarget.elements.query.value;

//   if (apiServise.query.trim() === '') {
//     return toastr.warning('Пожалуйста, введите ваш запроc');
//   }

//   clearGallery();
//   clearInput(e);
//   refs.pageList.innerHTML = '';

//   refs.preloader.classList.remove('done');
//   apiServise.resetPage();
//   currentPage = 1;
//   searchFetch(); //  отрисовка страницы по результату поиска
// }

// function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

// //ф-ция для очистки инпута
// function clearInput(e) {
//   e.currentTarget.elements.query.value = '';
// }

// //ф-ция для рендеринга данных в галлерею
// function renderMarkup(results) {
//   const destrResults = destructArray(results);
//   refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(destrResults));
// }
// function destructArray(arr) {
//   return arr.map(
//     ({
//       first_air_date,
//       id,
//       name,
//       backdrop_path,
//       original_title,
//       genre_ids,
//       poster_path,
//       release_date,
//     }) => ({
//       first_air_date,
//       id,
//       name,
//       backdrop_path,
//       original_title,
//       genre_ids,
//       poster_path,
//       release_date,
//       dataMovie: JSON.stringify({
//         first_air_date,
//         id,
//         name,
//         backdrop_path,
//         original_title,
//         genre_ids,
//         poster_path,
//         release_date,
//       }),
//     })
//   );
// }

// function preloader() {
//   if (!refs.preloader.classList.contains('done')) {
//     refs.preloader.classList.add('done');
//   }
// }
// function searchFetch() {
//   //  обработка ответа API по результату поиска и отрисовка страницы
//   apiServise
//     .fetchMoviesByRequest()
//     .then(data => {
//       totalPages = data.total_pages;
//       refs.lastBtn.textContent = totalPages;
//       // console.log(data)
//       init();
//       return data.results;
//     })
//     .then(results => {
//       if (results.length < 1) {
//         toastr.error('Фильм не найден! Измените ввод и повторите попытку');
//         apiServise.query = '';
//         fetchGall();
//       }
//       renderMarkup(match(destructArray(results)));
//       setTimeout(preloader, 200);
//     })

//     .catch(error => console.log(error));
// }
// function fetchGall() {
//   apiServise
//     .fetchPopularMovies()
//     .then(data => {
//       totalPages = data.total_pages;
//       refs.lastBtn.textContent = totalPages;
//       // console.log(data)
//       init();
//       return data.results;
//     })
//     .then(results => {
//       renderMarkup(match(destructArray(results)));
//       setTimeout(preloader, 200);
//     })

//     .catch(error => console.log(error));
// }
