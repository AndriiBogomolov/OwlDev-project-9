// import axios from 'axios';



// const API_KEY = 'e52c7d8699df589ec79fa44e6b7f6a0c';
// const BASE_URL = 'https://api.themoviedb.org';


// export default class FilmotekaApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetch() {
//         const url = `${BASE_URL}3/search/movie?api_key=${API_KEY}&query=Jack + Reacher`;
//         return url
//             .get(url)
//             .then(function (response) {
//                 console.log(response.json)
//                 return response.json();
//             })
//             .then(({ object }) => {
//                 this.incrementPage();
//                 return { object };
//             })
//             .catch(error => console.log(error));

//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }

// }

const API_KEY = 'e52c7d8699df589ec79fa44e6b7f6a0c';
const BASE_URL = 'https://api.themoviedb.org/';

export default class ApiServise {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }
    fetchMoviesByRequest() {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
        return fetch(url)
            .then(response => response.json())
        console.log(fetchMoviesByRequest())

            .then(({ results }) => {
                this.incrementPage();

                return results;
            });

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
}




let currentPage = 1;
let totalPages;
const pageRange = 2;

init();
refs.searchForm.addEventListener('submit', onSearchForm);
