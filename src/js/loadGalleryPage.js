import { ApiService } from "./ApiServise";
import { spinnerStart, spinnerStop } from "./spinner";
import { Notify } from "notiflix";
import { pagination } from './tuiPagination';

const gallery = document.querySelector('.movies');   
const paginationBlock = document.querySelector('.tui-pagination')
const currentPage = pagination.getCurrentPage();

// Запрашиваем данные из localstorage для idList
let idList = [696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 696157, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 597, 646389, 646389, 646389, 646389, 646389, 646389];  ///Пример


let totalItems = idList.length;

pagination.reset(totalItems);
spinnerStart();
loadMoviesList(idList);

pagination.on('afterMove', loadMore);   
   
function loadMoviesList(idList) {
  if (idList.length === 0) {
      spinnerStop()
      return Notify.failure('There no movies added to your list yet.');
  }
loadOnePage(currentPage);;
}   

function loadOnePage(pageNumber) {
  for(let i=(pageNumber - 1) * 20 ; i<pageNumber * 20; i+=1) {
    if (i === totalItems ) {
      return;
    }
    findMovieById(idList[i]);
  }
}

function loadMore(event) {
    gallery.innerHTML = '';
    const currentPage = event.page;
    console.log(currentPage);
    try {
      spinnerStart();
      loadOnePage(currentPage);
      paginationBlock.classList.remove('is-hidden')
    } catch (error) {
      paginationBlock.classList.add('is-hidden');
      console.log(error);
      return Notify.failure('Something went wrong. Please try again later.');
    } finally {
      spinnerStop();
    }
}

  async function findMovieById(id) {
  try {
    spinnerStart()
    const response = await ApiService.getMoviesById(id);
    const { data } = response;

    const galleryMarkup = createNewMarkup(data);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    paginationBlock.classList.remove('is-hidden')
  }
  catch(error) {
      console.log(error);
      paginationBlock.classList.add('is-hidden')
      return Notify.failure('Something went wrong. Please try again later.');
  }
  finally {
    spinnerStop();
  }
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


