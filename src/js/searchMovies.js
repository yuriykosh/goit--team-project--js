import { Notify } from 'notiflix';
import { ApiService } from './ApiServise';
import createMarkup from './markUp';
import { spinnerStart, spinnerStop } from './spinner';
import { pagination } from './tuiPagination';

const gallery = document.querySelector('.movies');
const formEl = document.querySelector('.js-form');
const paginationBlock = document.querySelector('.tui-pagination')
const currentPage = pagination.getCurrentPage();

formEl.addEventListener('submit', onFormSubmit);

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
      return Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    }

    if (total_results !== 0) {
      Notify.success(`Hooray! We found ${total_results} movies.`);
    }

    const markUp = createMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
    paginationBlock.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
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
    const markUp = createMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
  } catch (err) {
    paginationBlock.classList.add('is-hidden');
    console.log(error);
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

    pagination.reset(total_results);     ///Почему отображается всего 50 страниц?
    
    if (results.length === 0) {
      spinnerStop();
      return Notify.failure(
        'Trending movies are not available. Please insert the name of the movie.'
      );
    }

    const markUp = createMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
    paginationBlock.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
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
    const markUp = createMarkup(results, genresList).join('');
    gallery.innerHTML = markUp;
  } catch (err) {
    paginationBlock.classList.add('is-hidden');
    console.log(err);
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}





async function findMovieTrailer(id) {
  try {
    const response = await ApiService.getMovieTreiler(id);
    const { data } = response;

    console.log(data.results);

    const videoKey = data.results.find(
      result => result.type === 'Trailer' && result.official
    ).key;
    console.log(videoKey);

    // if (results.length === 0) {
    //     spinnerStop()
    //     return Notify.failure('Trending movies are not available. Please insert the name of the movie.');
    // }

    // const markUp = createMarkup(results, genresList).join('');
    // gallery.innerHTML =  markUp;
    // spinnerStop()
  } catch (error) {
    spinnerStop();
    console.log(error);
    return Notify.failure('Something went wrong. Please try again later.');
  }
}

// findMovieTrailer(615777)

const videoPlayer = document.getElementById('pvideo-placeholder');
console.log(videoPlayer);

// const iFrame = `<iframe id="player" type="text/html" width="640" height="360"
//   src="http://www.youtube.com/embed/QXhCu0o79kY?enablejsapi=1&origin=http://example.com"
//   frameborder="0"></iframe>`

//   videoPlayer.innerHTML = iFrame;


function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-placeholder', {
      width: 600,
      height: 400,
      videoId: 'Xa0Q0J5tOP0',
      playerVars: {
          color: 'white',
          playlist: 'taJ60kskkns,FG0fTKAqZ5g'
      },
      events: {
          onReady: initialize
      }
  });
}