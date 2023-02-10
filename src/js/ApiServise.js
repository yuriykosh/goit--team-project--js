import axios from "axios";

export const ApiService = {

    API_KEY: 'a3ea6037e929c907cd6335d101a9b094',
    BASE_URL: 'https://api.themoviedb.org/3',
    searchQuery: '',

    getMoviesByName(page) {
        const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}&page=${page}&include_adult=false`;
        return axios.get(url);
    },

    getMoviesById(id) {
        const url = `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`;
        return axios.get(url);
    },

    getTrendMovies(page) {
        const url = `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&page=${page}`;
        return axios.get(url);
    },

    getGenresList() {
        const url = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
        return axios.get(url);
    },

    getMovieTreiler(id) {
        const url = `${this.BASE_URL}/movie/${id}/videos?api_key=${this.API_KEY}`;
        return axios.get(url);
    },

    getYoutubeVideo() {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=63dd6339ddd52d007c816067&key=[YOUR_API_KEY]`;
        return axios.get(url);
    },

//     createMovieList() {
// const url = `https://api.themoviedb.org/3/list?api_key=${this.API_KEY}&session_id=1`
// // {
// //     "name": "This is my awesome test list.",
// //     "description": "Just an awesome list dawg.",
// //     "language": "en"
// //   }

// axios.post(url, {
//     "name": "This is my awesome test list.",
//     "description": "Just an awesome list dawg.",
//     "language": "en"
//   })
//   .then(response => console.log(response))
//   .catch(error => console.log(error));
// },
    

    set query(newQuery) {
        this.searchQuery = newQuery;
    },

    get query() {
        return this.searchQuery;
    },
}