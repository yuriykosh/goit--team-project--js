const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const movies = document.querySelector('.movies');

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
  if (moviesCard) openModal();
}

function openModal(event) {
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  modal.addEventListener('click', clickModal);
  document.addEventListener('keydown', clickModal);
}
