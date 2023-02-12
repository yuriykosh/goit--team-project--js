import { ApiService } from './ApiServise';
import { Notify } from 'notiflix';
import { spinnerStart, spinnerStop } from './spinner';
import findMovieTrailer from './player';
import onBtnClick from './modalBtnLogics';
import { createModalMarkup } from './markUp';
import 'material-icons/iconfont/material-icons.css';
import { callCount } from './firebase';

const modal = document.querySelector('[data-modal]');
const movies = document.querySelector('.movies');
const wrapper = document.querySelector('.movie-modal');

movies.addEventListener('click', clickList);

function clickModal(event) {
  if (event.target.nodeName === 'BUTTON') {
    return;
  }

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
  modal.removeAttribute('id');
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

    if (!callCount) {
      btnAddToWatched.disabled = true;
      btnAddToQueue.disabled = true;
      Notify.warning('Please login or sign up');
    }

    btnAddToWatched.addEventListener('click', event =>
      onBtnClick(event, 'WATCHED')
    );
    btnAddToQueue.addEventListener('click', event =>
      onBtnClick(event, 'QUEUE')
    );
    const playBtn = document.querySelector('.js-playBtn');
    playBtn.addEventListener('click', onPlayTrailer);
  } catch (error) {
    console.log(error);
    return Notify.failure('Something went wrong. Please try again later.');
  } finally {
    spinnerStop();
  }
}

function onPlayTrailer(event) {
  const moviesId = event.target.closest('[data-modal]').id;
  findMovieTrailer(moviesId);
}
