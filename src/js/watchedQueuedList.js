import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
import { spinnerStart, spinnerStop } from "./spinner";
import empty from '../images/empty-list.gif';
import { pagination } from './tuiPagination';
import { onScroll, onToTopBtn } from "./scroll-to-top";
import { createGalleryMarkup } from './markUp';

const refs = {
    watched: document.querySelector('.button-watched'), 
    queued: document.querySelector('.button-queued'), 
    movieList: document.querySelector('.movies'), 
    paginationBlock: document.querySelector('#pagination'),
    toTopBtn: document.querySelector('.btn-to-top'),
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

export default function loadMoviesList(list) {
  if (!list) {
      refs.movieList.innerHTML = `
      <li>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
  loadOnePage(currentPage);
}   

function loadOnePage(pageNumber) {
  for(let i=(pageNumber - 1) * 20 ; i<pageNumber * 20; i+=1) {
    if (i === totalItems ) {
      return;
    }
    findMovieById(idList[i]);
  }
}

async function findMovieById(id) {
  try {
    spinnerStart()
    const response = await ApiService.getMoviesById(id);
    const { data } = response;

    const galleryMarkup = createGalleryMarkup(data);
    refs.movieList.insertAdjacentHTML('beforeend', galleryMarkup);
    refs.paginationBlock.classList.remove('is-hidden');
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