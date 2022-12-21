// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = 'cf7103a04560136cfec7834a7d0f8600';

// export default class ApiServise {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//   }

//   fetchPopularMovies() {
//     const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
//     return fetch(url).then(response => response.json());
//     // .then(({ results }) => {
//     //   return results;
//     // });
//   }

//   fetchMoviesByRequest() {
//     const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
//     return fetch(url).then(response => response.json());
//     // .then(({ results }) => {
//     //   this.incrementPage();
//     //   return results;
//     // });
//   }

//   fetchMovieDetails(movieId) {
//     const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         return data;
//       });
//     // .then(data => ({
//     //   data
//     // })).then(({ data }) => {
//     //   console.log({data})
//     //   return data
//     // })
//   }
//   // Поиск видео с ютуба
//   fatchTrailerSearch(movieId) {
//     const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         return data;
//       });
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   clearInput() {
//     this.searchQuery.innerHTML = '';
//   }

//   pagination(el) {
//     this.page = el;
//   }
// }
