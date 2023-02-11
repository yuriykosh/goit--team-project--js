import { ApiService } from './ApiServise';
import { Notify } from 'notiflix';
import { spinnerStart, spinnerStop } from './spinner';
import findMovieTrailer from './player';
import onBtnClick from './modalBtnLogics';

const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const movies = document.querySelector('.movies');
const wrapper = document.querySelector('.movie-modal');

// const btnAddToWatched = document.querySelector('.btn_add_watched');
// const btnAddToQueue = document.querySelector('.btn_add_queue');

movies.addEventListener('click', clickList);

function clickModal(event) {
  console.log('test');
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
  wrapper.innerHTML =     `<div class="player"></div>
  <button data-modal-close class="movie-modal__close-btn" type="button">
    <svg class="movie-modal__close-btn-icon" width="30" height="30">
      <use href="./images/symbol.svg#icon-close-btn-modal"></use>
    </svg>
  </button>`;
  modal.removeAttribute("id")
}

function clickList(event) {
  const moviesCard = event.target.closest('.movies__item');
  if (moviesCard) {
    modal.setAttribute('id', moviesCard.id);
    // btnAddToWatched.setAttribute('data-id', moviesCard.id);
    // btnAddToQueue.setAttribute('data-id', moviesCard.id);
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
    console.log(data);

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

  const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`;

  const {genres, poster_path, title, vote_average, id, vote_count, popularity, original_title, overview} = data;

  const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const genresList = genres.map(genre => genre.name);
  const genresItems = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
  const voteAverage = vote_average.toFixed(1);
  const popul = popularity.toFixed(1);

  return `<div class="movie-modal__wrapper">
    <div class="movie-modal__imgBox">
    <button class="movie-modal__video-btn js-playBtn">
      <svg class="movie-modal__play-btn" width="80" height="80">
        <use href="./images/symbol.svg#icon-play"></use>
      </svg>
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
          <p class="movie-modal__info__item__value">${original_title}</p>
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
        add to watched
      </button>
      <button id="add-to-queue" class="movie-modal__button__item btn_add_queue" data-id=${id}>
        add to queue
      </button>
    </div>
  </div>
</div>`
}

function onPlayTrailer(event) {
  const moviesId = event.target.closest('[data-modal]').id;
  findMovieTrailer(moviesId);
}