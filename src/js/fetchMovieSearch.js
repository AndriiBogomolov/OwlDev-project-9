import { API_KEY, BASE_URL } from './api-service';
export default class ApiServise {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }
    async fetchMoviesByRequest() {
        const url = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`);
        return fetch(url)
            .then(response => response.json())
        // console.log(fetchMoviesByRequest())

    //     .then(({ results }) => {
    //         this.incrementPage();

    //         return results;
    //     });
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
