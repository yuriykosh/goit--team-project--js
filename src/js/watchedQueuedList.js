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

startPage('WATCHED');

function onClick(event) {
  STORAGE_KEY = event.target.dataset.name;

  let movieList = localStorageService.load(STORAGE_KEY); 
  if (STORAGE_KEY === 'WATCHED') {
    refs.watched.classList.add('is-active');
    refs.queued.classList.remove('is-active');
  } else{
    refs.queued.classList.add('is-active');
    refs.watched.classList.remove('is-active');
  }
  loadMoviesList(movieList);
}

function startPage(buttonKey) {
  refs.watched.classList.add('is-active');
  STORAGE_KEY = buttonKey;
  let movieList = localStorageService.load(STORAGE_KEY); 
  let totalItems = !movieList ? 0 : movieList.length;
  let totalPages = Math.ceil(totalItems/20);

  if (movieList.length > 20) {
    refs.paginationBlock.classList.remove('is-hidden');
    pagination.reset(totalItems);
    const currentPage = pagination.getCurrentPage();
    pagination.on('afterMove', loadMore); 

    loadOnePage(currentPage, movieList)
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
  // loadOnePage(currentPage);
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

  // refs.movieList.innerHTML = '';
  const currentPage = event.page;
  console.log(currentPage);

  // try {
  //   spinnerStart();
  //   loadOnePage(currentPage);
  //   refs.paginationBlock.classList.remove('is-hidden')
  // } catch (error) {
  //   refs.paginationBlock.classList.add('is-hidden');
  //   console.log(error);
  //   return Notify.failure('Something went wrong. Please try again later.');
  // } finally {
  //   spinnerStop();
  // }
}



// refs.paginationBlock.classList.add('is-hidden');

// let idList = localStorageService.load(STORAGE_KEY);

// let totalItems = !idList ? 0 : idList.length;
// pagination.reset(totalItems);
// const currentPage = pagination.getCurrentPage();
// loadMoviesList(idList);

// pagination.on('afterMove', loadMore);  










// function clearMovieList(){
//    refs.movieList.innerHTML = ""; 
//    pagination.movePageTo(1);
// }





// import { Notify } from 'notiflix';
// import { ApiService } from './ApiServise';
// const STORAGE_KEY = 'movie';
// localStorage.setItem(STORAGE_KEY, 520);

// const refs = {
//     watched: document.querySelector('.button-watched'), 
//     queued: document.querySelector('.button-queued'), 
//     movieList: document.querySelector('.movies'), 
// }

// const userId = 5;

// refs.watched.addEventListener('click', onWatchedClick);

// function onWatchedClick(event) {
//    if (userId === 5) {
// clearMovieList();   
// const markUp = `<li class="movies__item">
//         <div class="movies__wrapper">
//           <img loading="lazy" class="movies__poster" src="/mobile-poster-filler.68d38ad9.jpeg" alt="movies__poster">
//         </div>
//         <div class="movies__meta">
//           <h2 class="movies__title">Monster Hunter</h2>
//           <div class="movies__desc">
//             <span class="movies__desc-genres">Drama, Action</span>|
//             <span class="movies__desc-release-year">2020</span>
//             <span class="movies__vote">8.3</span>
//           </div>
//         </div>
//       </li>`;
// refs.movieList.insertAdjacentHTML('beforeend', markUp);
// } 
// }


// async function watchedMovie(id) {
//     console.log('hello')
//     try { 
//         const response = await ApiService.getMoviesById(id);
//         const { data } = response;

//         console.log(data);
//         createMarkup(data); 

//     }
//     catch(error) {

//         console.log(error);
//         return Notify.failure('Something went wrong. Please try again later.');
//     }
// }

//  watchedMovie(505642)

// function clearMovieList(){
//    refs.movieList.innerHTML = ""; 
// }