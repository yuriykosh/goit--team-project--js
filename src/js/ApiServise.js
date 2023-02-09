import axios from "axios";

export const ApiService = {

    API_KEY: 'a3ea6037e929c907cd6335d101a9b094',
    BASE_URL: 'https://api.themoviedb.org/3',
    searchQuery: '',
    page: 1,

    getMoviesByName() {
        const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
        // this.incrementPage();
        return axios.get(url);
    },

    getTrendMovies() {
        const url = `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}`;
        return axios.get(url);
    },

    getGenresList() {
        const url = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
        return axios.get(url);
    },

    incrementPage() {
        this.page += 1;
    },

    resetPage() {
        this.page = 1;
    },

    set query(newQuery) {
        this.searchQuery = newQuery;
    },

    get query() {
        return this.searchQuery;
    },
}