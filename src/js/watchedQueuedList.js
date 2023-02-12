import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
import { spinnerStart, spinnerStop } from "./spinner";
import empty from '../images/empty-list.gif';
// import { pagination } from './tuiPagination';
import { onScroll, onToTopBtn } from "./scroll-to-top";
import { createGalleryMarkup } from './markUp';
import localStorageService from './localStorage-service';

const refs = {
    watched: document.querySelector('.button-watched'), 
    queued: document.querySelector('.button-queued'), 
    movieList: document.querySelector('.movies'), 
    paginationBlock: document.querySelector('#pagination'),
    toTopBtn: document.querySelector('.btn-to-top'),
}

window.addEventListener('scroll', onScroll);
refs.watched.addEventListener('click', onClick);
refs.queued.addEventListener('click', onClick);
refs.toTopBtn.addEventListener('click', onToTopBtn);

let STORAGE_KEY = 'WATCHED';

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

  // clearMovieList();   
loadMoviesList(movieList);


}



// refs.watched.classList.add('is-active');
// refs.paginationBlock.classList.add('is-hidden');



// let idList = localStorageService.load(STORAGE_KEY);

// let totalItems = !idList ? 0 : idList.length;
// pagination.reset(totalItems);
// const currentPage = pagination.getCurrentPage();
// loadMoviesList(idList);

// pagination.on('afterMove', loadMore);  





export default function loadMoviesList(list) {
  if (!list) {
      refs.movieList.innerHTML = `
      <li>
        <img src="${empty}" alt="The list is empty." />
      </li>`;
    return;
  }
createGalleryMarkup(list);
  // loadOnePage(currentPage);
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
   pagination.movePageTo(1);
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

// export default function createMovieMarkup(results) {
//     return results.map(result => {
//       const { genre_ids, poster_path, release_date, title, vote_average } = result;
//       const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//       const releaseYear = release_date.slice(0, 4);
//       const genresList = data.genres.filter(genre => genre_ids.includes(genre.id))
//       .map(item => item.name);
//       const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
//       const defaultImage = "/src/images/mobile-poster-filler.jpeg";
//       const voteAverage = vote_average.toFixed(1);

//      return `
//      <li class="movies__item">
//         <div class="movies__wrapper">
//           <img
//             loading="lazy"
//             class="movies__poster"
//             src=${posterLink}
//             onerror=${defaultImage}
//             alt=${title}
//           />
//         </div>
//         <div class="movies__meta">
//           <h2 class="movies__title">${title}</h2>
//           <div class="movies__desc">
//             <span class="movies__desc-genres">${genres}</span>|
//             <span class="movies__desc-release-year">${releaseYear}</span>
//             <span class="movies__vote is-hidden">${voteAverage}</span>
//           </div>
//         </div>
//       </li>`;
//      })
//  }     

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