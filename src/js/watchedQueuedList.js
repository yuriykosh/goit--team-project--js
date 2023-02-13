import empty from '../images/empty-list.gif';
import { pagination } from './tuiPagination';
import { onScroll, onToTopBtn } from "./scroll-to-top";
import { createGalleryMarkup } from './markUp';
import localStorageService from './localStorage-service';
import refs from './refs';

window.addEventListener('scroll', onScroll);
refs.watched.addEventListener('click', onClick);
refs.queued.addEventListener('click', onClick);
refs.toTopBtn.addEventListener('click', onToTopBtn);

let STORAGE_KEY = '';
let movieList = []; 
let totalItems = 0;
let totalPages = 0;


startPage('WATCHED');

function onClick(event) {
  pagination.off('afterMove', loadMore);
  refs.paginationBlock.classList.add('is-hidden')
  STORAGE_KEY = event.target.dataset.name;

  movieList = localStorageService.load(STORAGE_KEY); 
  if (STORAGE_KEY === 'WATCHED') {
    refs.watched.classList.add('is-active');
    refs.queued.classList.remove('is-active');
  } else{
    refs.queued.classList.add('is-active');
    refs.watched.classList.remove('is-active');
  }

  if (movieList.length > 20) {
    refs.paginationBlock.classList.remove('is-hidden');
    pagination.reset(totalItems);
    const currentPage = pagination.getCurrentPage();
    pagination.on('afterMove', loadMore); 

    loadOnePage(currentPage, movieList)
    return;
  }

  loadMoviesList(movieList);
}

function startPage(buttonKey) {
  refs.paginationBlock.classList.add('is-hidden')
  refs.watched.classList.add('is-active');
  pagination.off('afterMove', loadMore);
  STORAGE_KEY = buttonKey;
  movieList = localStorageService.load(STORAGE_KEY); 
  totalItems = !movieList ? 0 : movieList.length;
  totalPages = Math.ceil(totalItems/20);

  if (movieList.length > 20) {
    refs.paginationBlock.classList.remove('is-hidden');
    pagination.reset(totalItems);
    const currentPage = pagination.getCurrentPage();
    pagination.on('afterMove', loadMore); 

    loadOnePage(currentPage, movieList)
    return;
  }
  loadMoviesList(movieList);
}

function loadMoviesList(list) {
  if (list.length === 0) {
      refs.movieList.innerHTML = `
      <li>
        <p class="empty__notify">where is everyone?</p>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
const galeryMarkUp = createGalleryMarkup(list);
refs.movieList.innerHTML = galeryMarkUp.join('');
}   

function loadOnePage(pageNumber, list) {
  let listToDraw = [];

  for(let i=(pageNumber - 1) * 20 ; i<pageNumber * 20; i+=1) {
    if (i === list.length ) {
      break;
    }

    listToDraw.push(list[i]);
  }
  loadMoviesList(listToDraw);
}

function loadMore(event) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentPage = event.page;
  loadOnePage(currentPage, movieList);
}