import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
import { spinnerStart, spinnerStop } from "./spinner";
import empty from '../images/empty-list.gif';
import { pagination } from './tuiPagination';
import { onScroll, onToTopBtn } from "./scroll-to-top";

const refs = {
    watched: document.querySelector('.button-watched'), 
    queued: document.querySelector('.button-queued'), 
    movieList: document.querySelector('.movies'), 
    paginationBlock: document.querySelector('.tui-pagination'),
    toTopBtn: document.querySelector('.btn-to-top')
}

refs.watched.isActive = true;
console.dir(refs.queued);

let STORAGE_KEY = 'WATCHED';
let idList = JSON.parse(localStorage.getItem(STORAGE_KEY));
console.dir(idList);

let totalItems = !idList ? 0 : idList.length;
pagination.reset(totalItems);
const currentPage = pagination.getCurrentPage();

window.addEventListener('scroll', onScroll);
refs.watched.addEventListener('click', onClick);
refs.queued.addEventListener('click', onClick);
refs.toTopBtn.addEventListener('click', onToTopBtn);

function onClick(event) {
  STORAGE_KEY = event.target.dataset.name;
  clearMovieList();   
  loadMoviesList(idList);
}

function loadMoviesList(list) {
  if (!list) {
      spinnerStop()
      refs.movieList.innerHTML = `
      <li>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
  for(let i = (currentPage - 1) * 20; i < currentPage * 20; i += 1) {
    if (i === totalItems ) {
      return;
    }
    findMovieById(list[i]);
  }
}   

async function findMovieById(id) {
  try {
    spinnerStart()
    const response = await ApiService.getMoviesById(id);
    const { data } = response;

    const galleryMarkup = createNewMarkup(data);
    refs.movieList.insertAdjacentHTML('beforeend', galleryMarkup);
    refs.paginationBlock.classList.remove('is-hidden')
  }
  catch(error) {
      console.log(error);
      refs.paginationBlock.classList.add('is-hidden');
      return Notify.failure('Something went wrong. Please try again later.');
  }
  finally {
    spinnerStop();
  }
}

function clearMovieList(){
   refs.movieList.innerHTML = ""; 
}

function createNewMarkup(data) {
  const {genres, poster_path, release_date, title, vote_average, id } = data;

  const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const releaseYear = release_date.slice(0, 4);
  const genresList = genres.map(genre => genre.name);
  const genresItems = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
  const voteAverage = vote_average.toFixed(1);

 return `
 <li class="movies__item" id=${id}>
    <div class="movies__wrapper">
    <img 
     alt=${title} src=${posterLink} class="movies__poster" loading="lazy">
    </div>
    <div class="movies__meta">
      <h2 class="movies__title">${title}</h2>
      <div class="movies__desc">
        <span class="movies__desc-genres">${genresItems}</span>|
        <span class="movies__desc-release-year">${releaseYear}</span>
        <span class="movies__vote is-hidden">${voteAverage}</span>
      </div>
    </div>
  </li>`;
 }