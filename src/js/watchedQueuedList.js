import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
// import empty from '../images/empty-list.gif';

const STORAGE_KEY = 'movie';
localStorage.setItem(STORAGE_KEY, 520);

const refs = {
    watched: document.querySelector('.button-watched'), 
    queued: document.querySelector('.button-queued'), 
    movieList: document.querySelector('.movies'), 
}

refs.watched.addEventListener('click', onWatchedClick);
refs.queued.addEventListener('click', onQueuedClick);

function onWatchedClick(event) {
clearMovieList();   
const markUp = `<li class="movies__item">
        <div class="movies__wrapper">
          <img loading="lazy" class="movies__poster" src="/mobile-poster-filler.68d38ad9.jpeg" alt="movies__poster">
        </div>
        <div class="movies__meta">
          <h2 class="movies__title">Monster Hunter</h2>
          <div class="movies__desc">
            <span class="movies__desc-genres">Drama, Action</span>|
            <span class="movies__desc-release-year">2020</span>
            <span class="movies__vote">8.3</span>
          </div>
        </div>
      </li>`;

      if (!arrMovie.length) {
    refs.movies.innerHTML = `
      <li>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
refs.movieList.insertAdjacentHTML('beforeend', markUp);
}

export default function createMovieMarkup(results) {
    return results.map(result => {
      const { genre_ids, poster_path, release_date, title, vote_average } = result;
      const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const releaseYear = release_date.slice(0, 4);
      const genresList = data.genres.filter(genre => genre_ids.includes(genre.id))
      .map(item => item.name);
      const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
      const defaultImage = "/src/images/mobile-poster-filler.jpeg";
      const voteAverage = vote_average.toFixed(1);

     return `
     <li class="movies__item">
        <div class="movies__wrapper">
          <img
            loading="lazy"
            class="movies__poster"
            src=${posterLink}
            onerror=${defaultImage}
            alt=${title}
          />
        </div>
        <div class="movies__meta">
          <h2 class="movies__title">${title}</h2>
          <div class="movies__desc">
            <span class="movies__desc-genres">${genres}</span>|
            <span class="movies__desc-release-year">${releaseYear}</span>
            <span class="movies__vote is-hidden">${voteAverage}</span>
          </div>
        </div>
      </li>`;
     })
 }     

async function watchedMovie(id) {
    console.log('hello')
    try { 
        const response = await ApiService.getMoviesById(id);
        const { data } = response;

        console.log(data);
        createMarkup(data); 

    }
    catch(error) {
     
        console.log(error);
        return Notify.failure('Something went wrong. Please try again later.');
    }
}
 
 watchedMovie(505642)

function onQueuedClick(event) {
clearMovieList();   
const markUp = `<li class="movies__item">
        <div class="movies__wrapper">
          <img loading="lazy" class="movies__poster" src="/mobile-poster-filler.68d38ad9.jpeg" alt="movies__poster">
        </div>
        <div class="movies__meta">
          <h2 class="movies__title">Monster Hunter</h2>
          <div class="movies__desc">
            <span class="movies__desc-genres">Drama, Action</span>|
            <span class="movies__desc-release-year">2020</span>
            <span class="movies__vote">8.3</span>
          </div>
        </div>
      </li>`;
      
      if (!queueMovie.length) {
    refs.movies.innerHTML = `
      <li>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
refs.movieList.insertAdjacentHTML('beforeend', markUp);
}


function clearMovieList(){
   refs.movieList.innerHTML = ""; 
}