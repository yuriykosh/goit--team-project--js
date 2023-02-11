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
    paginationBlock: document.querySelector('#pagination'),
    toTopBtn: document.querySelector('.btn-to-top')
}

refs.watched.classList.add('is-active');
refs.paginationBlock.classList.add('is-hidden');

let STORAGE_KEY = 'WATCHED';
let idList = JSON.parse(localStorage.getItem(STORAGE_KEY));
let totalItems = !idList ? 0 : idList.length;
pagination.reset(totalItems);
const currentPage = pagination.getCurrentPage();
loadMoviesList(idList);

pagination.on('afterMove', loadMore);  

window.addEventListener('scroll', onScroll);
refs.watched.addEventListener('click', onClick);
refs.queued.addEventListener('click', onClick);
refs.toTopBtn.addEventListener('click', onToTopBtn);

function onClick(event) {
  refs.watched.classList.remove('is-active');
  STORAGE_KEY = event.target.dataset.name;
  clearMovieList();   
  loadMoviesList(idList);
}

function loadMoviesList(list) {
  if (!list) {
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

function loadMore(event) {
  refs.movieList.innerHTML = '';
  const currentPage = event.page;

  try {
    spinnerStart();
    loadOnePage(currentPage);
    refs.paginationBlock.classList.remove('is-hidden')
  } catch (error) {
    refs.paginationBlock.classList.add('is-hidden');
    console.log(error);
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

function createNewMarkup(data) {
  const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`; ///////////

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
     alt=${title} src=${posterLink} onerror="this.onerror=null;this.src='${defaultImage}';" class="movies__poster" loading="lazy">
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