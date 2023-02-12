import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
import { createMainMarkup } from './markUp';
import { spinnerStart, spinnerStop } from './spinner';
import { pagination } from './tuiPagination';
import { onScroll, onToTopBtn } from "./scroll-to-top";
import empty from '../images/empty-list.gif';

const gallery = document.querySelector('.movies');
const formEl = document.querySelector('.js-form');
const paginationBlock = document.querySelector('.tui-pagination')
const currentPage = pagination.getCurrentPage();
const toTopBtn = document.querySelector('.btn-to-top');

formEl.addEventListener('submit', onFormSubmit);
window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

Notify.init({
  width: '400px',
  clickToClose: true,
});

fetchTrendMovies();
pagination.on('afterMove', loadMoreTrendingMovies);

function onFormSubmit(e) {
  e.preventDefault();
  
  const searchValue = e.currentTarget.elements.query.value.trim();

  if (!searchValue) {
    return Notify.failure('Please insert the name of the movie.');
  }

  paginationBlock.classList.add('is-hidden');
  pagination.off('afterMove', loadMoreTrendingMovies);
  pagination.off('afterMove', loadMoreSearchingPhotos);
  pagination.on('afterMove', loadMoreSearchingPhotos);
  ApiService.query = searchValue;

  if (ApiService.query === '') {
    return Notify.failure('Please insert the name of the movie.');
  }

  formEl.reset();
  gallery.innerHTML = '';
  fetchMovies();
}

async function fetchMovies() {
  try {
    spinnerStart();
    const response = await ApiService.getMoviesByName(currentPage);
    const genresList = await ApiService.getGenresList();
    const { data } = response;
    const { page, results, total_pages, total_results } = data;

    pagination.reset(total_results);

    if (results.length === 0) {
      spinnerStop();
      gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
      return Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    }

    if (total_results !== 0) {
      Notify.success(`Hooray! We found ${total_results} movies.`);
    }

    const markUp = createMainMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
    paginationBlock.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

async function loadMoreSearchingPhotos(event) {
  const currentPage = event.page;
  try {
    spinnerStart();
    const response = await ApiService.getMoviesByName(currentPage);
    const genresList = await ApiService.getGenresList();
    const { data } = response;
    const { page, results, total_pages, total_results } = data;
    const markUp = createMainMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
  } catch (err) {
    paginationBlock.classList.add('is-hidden');
    console.log(error);
    gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

async function fetchTrendMovies() {
  try {
    spinnerStart();
    const response = await ApiService.getTrendMovies(currentPage);
    const genresList = await ApiService.getGenresList();
    const { data } = response;
    const { page, results, total_pages, total_results } = data;

    pagination.reset(total_results);    
    
    if (results.length === 0) {
      spinnerStop();
      gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
      return Notify.failure(
        'Trending movies are not available. Please insert the name of the movie.'
      );
    }

    const markUp = createMainMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
    paginationBlock.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

async function loadMoreTrendingMovies(event) {
  const currentsPage = event.page;

  try {
    spinnerStart();
    const response = await ApiService.getTrendMovies(currentsPage);
    const genresList = await ApiService.getGenresList();
    const { data } = response;
    const { page, results, total_pages, total_results } = data;
    const markUp = createMainMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
  } catch (err) {
    paginationBlock.classList.add('is-hidden');
    gallery.innerHTML = `<li>
      <p class="empty__notify">where is everyone?</p>
      <img src="${empty}" alt="The list is empty." />
    </li>`;
    console.log(err);
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}