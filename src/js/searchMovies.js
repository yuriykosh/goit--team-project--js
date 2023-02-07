import { Notify } from "notiflix";
import { ApiService } from './ApiServise';
import createMarkup from './markup';

// const gallery = document.querySelector('.js-gallery');   //Когда появится разметка
const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);

Notify.init({
    width: '400px',
    clickToClose: true,
});

function onFormSubmit(e) {
    e.preventDefault();
    // gallery.innerHTML = '';   //Когда появится разметка

    if (ApiService.query === '') {
        return Notify.failure('Please insert the name of the movie.');
    }
    
    ApiService.resetPage();
//     spinner.spin();
//     body.appendChild(spinner.el);
    fetchMovies();
}

function onFormInput(e) {
    ApiService.query = e.target.value.trim();
}

async function fetchMovies() {
    try {
        const response = await ApiService.getMoviesByName();
        const genresList = await ApiService.getGenresList();
        const { data } = response;
        const { page, results,total_pages, total_results } = data;


        if (results.length === 0) {
//             spinner.stop();
            return Notify.failure('Sorry, there are no movies matching your search query. Please try again.');
        }
        
        if (total_results !== 0) {
            Notify.success(`Hooray! We found ${total_results} movies.`);
        }

        const markUp = createMarkup(results, genresList);
        // gallery.insertAdjacentHTML('beforeend', markUp.join(''));     //Когда появится разметка

//         spinner.stop();

    } catch (error) {
        console.log(error);
    }
}