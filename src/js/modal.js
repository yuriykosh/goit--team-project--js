import { ApiService } from './ApiServise';
import { Notify } from 'notiflix';
import { spinnerStart, spinnerStop } from './spinner';
import findMovieTrailer from './player';
import onBtnClick from './modalBtnLogics';
import 'material-icons/iconfont/material-icons.css';

const modal = document.querySelector('[data-modal]');
const movies = document.querySelector('.movies');
const wrapper = document.querySelector('.movie-modal');

movies.addEventListener('click', clickList);

function clickModal(event) {
  if (event.target.nodeName === 'BUTTON') {
    return;
  };

  if (
    ((!event.target.closest('.movie-modal') ||
      event.target.closest('[data-modal-close]')) &&
      !event.keyCode) ||
    event.keyCode === 27
  ) {
    closeModal();
    document.removeEventListener('keydown', clickModal);
    modal.removeEventListener('click', clickModal);
  }
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
  const markupWrapper = document.querySelector('.movie-modal__wrapper');
  modal.removeAttribute("id");
  markupWrapper.remove();
  
}

function clickList(event) {
  const moviesCard = event.target.closest('.movies__item');
  if (moviesCard) {
    modal.setAttribute('id', moviesCard.id);
    openModal(moviesCard.id);
  }
}

function openModal(id) {
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  fetchModalMarkup(id);
  modal.addEventListener('click', clickModal);
  document.addEventListener('keydown', clickModal);
}

async function fetchModalMarkup(id) {
  try {
    spinnerStart();
    const response = await ApiService.getMoviesById(id);
    const { data } = response;

    const markUp = createModalMarkup(data);
    wrapper.insertAdjacentHTML('beforeend', markUp);

    const btnAddToWatched = document.querySelector('.btn_add_watched');
    const btnAddToQueue = document.querySelector('.btn_add_queue');
    btnAddToWatched.addEventListener('click', (event) => onBtnClick(event, 'WATCHED'));
    btnAddToQueue.addEventListener('click', (event) => onBtnClick(event, 'QUEUE'));
    const playBtn = document.querySelector('.js-playBtn');
    playBtn.addEventListener('click', onPlayTrailer);
  } catch (error) {
    console.log(error);
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

function createModalMarkup(data) {
  const {genres, poster_path, title, vote_average, id, vote_count, popularity, original_title, overview} = data;
  let watchedText = '2121,2121,3434,14';
  let queueText = '';
  let watchedMovie = [];
  let queueMovie = [];


   watchedMovie = JSON.parse(localStorage.getItem('WATCHED')) ? JSON.parse(localStorage.getItem('WATCHED')) : [];

  if (!watchedMovie) {
    watchedText = 'add to watched';
  } else {
    watchedText = !watchedMovie.find(item => Number(item) === id) ? "add to watched" : "remove from watched";
  }

   queueMovie = JSON.parse(localStorage.getItem('QUEUE')) ? JSON.parse(localStorage.getItem('QUEUE')) : [];
  if (!queueMovie) {
    queueText = 'add to watched';
  } else {
    queueText = !queueMovie.find(item => Number(item) === id) ? "add to queue" : "remove from queue";
  }

  const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`;
  const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const genresList = genres.map(genre => genre.name);
  const genresItems = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
  const voteAverage = vote_average.toFixed(1);
  const popul = popularity.toFixed(1);
  const originalTitle = original_title.toUpperCase();

  return `<div class="movie-modal__wrapper">
    <div class="movie-modal__imgBox">
    <button class="movie-modal__video-btn js-playBtn">
      <span class="material-icons-round" style="font-size: 80px">play_circle</span>
    </button>
    <img class="movie-modal__imgBox__img" src=${posterLink}
      alt=${title} onerror="this.onerror=null;this.src='${defaultImage}';"/>
  </div>
  <div>
    <div>
      <h2 class="movie-modal__title">${title}</h2>
      <ul class="movie-modal__info">
        <li class="movie-modal__info__item">
          <p class="movie-modal__info__item__attribute">Vote / Votes</p>
          <p class="movie-modal__info__item__value">
            <span class="movie-modal__info__item__value__marker">${voteAverage}</span><span
              class="movie-modal__info__item__value-slash">/</span>
            <span class="movie-modal__info__item__value__marker--grey">${vote_count}</span>
          </p>
        </li>
        <li class="movie-modal__info__item">
          <p class="movie-modal__info__item__attribute">Popularity</p>
          <p class="movie-modal__info__item__value">${popul}</p>
        </li>
        <li class="movie-modal__info__item">
          <p class="movie-modal__info__item__attribute">Original Title</p>
          <p class="movie-modal__info__item__value">${originalTitle}</p>
        </li>
        <li class="movie-modal__info__item">
          <p class="movie-modal__info__item__attribute">Genre</p>
          <p class="movie-modal__info__item__value">${genresItems}</p>
        </li>
      </ul>
    </div>
    <div class="movie-modal__about">
      <h3 class="movie-modal__about-title">About</h3>
      <p class="movie-modal__desc">
        ${overview}
      </p>
    </div>
    <div class="movie-modal__button">
      <button id="add-to-watched" class="movie-modal__button__item btn_add_watched" data-id=${id}>
        ${watchedText}
      </button>
      <button id="add-to-queue" class="movie-modal__button__item btn_add_queue" data-id=${id}>
        ${queueText}
      </button>
    </div>
  </div>
</div>`
}

function onPlayTrailer(event) {
  const moviesId = event.target.closest('[data-modal]').id;
  findMovieTrailer(moviesId);
}