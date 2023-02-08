import { ApiService } from './ApiService';
import createMarkup from './markup';
import { Notify } from "notiflix";

const gallery = document.querySelector('.js-gallery');
const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);

function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = '';

    if (ApiService.query === '') {
        return Notify.failure('Please insert the name of the movie.');
    }
    
    ApiService.resetPage();
    fetchMovies();
}

function onFormInput(e) {
    ApiService.query = e.target.value.trim();
}

async function fetchMovies() {
    try {
        const response = await ApiService.getMoviesByName();
        const { data } = response;
        const { page, results,total_pages, total_results } = data;

        if (results.length === 0) {
            return Notify.failure('Sorry, there are no movies matching your search query. Please try again.');
        }
        
        if (total_results !== 0) {
            Notify.success(`Hooray! We found ${total_results} movies.`);
        }

        const markUp = createMarkup(results);

        gallery.insertAdjacentHTML('beforeend', markUp.join(''));


    } catch (error) {
        console.log(error);
    }
}