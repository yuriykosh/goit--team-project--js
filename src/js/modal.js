import { ApiService } from "./ApiServise";

const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const movies = document.querySelector('.movies');

const btnAddToWatched = document.querySelector('.btn_add_watched');
const btnAddToQueue = document.querySelector('.btn_add_queue');

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
}

function clickList(event) {
  const moviesCard = event.target.closest('.movies__item');
  if (moviesCard){
    btnAddToWatched.setAttribute('data-id', moviesCard.id);
    btnAddToQueue.setAttribute('data-id', moviesCard.id);
    openModal();
  };
}

function openModal() {
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  modal.addEventListener('click', clickModal);
  document.addEventListener('keydown', clickModal);
}
