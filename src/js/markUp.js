const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`; 


export function createMainMarkup(results, { data }) {

    return results.map(result => {
      const { genre_ids, poster_path, release_date, title, vote_average, id } = result;
      const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const releaseYear = release_date.slice(0, 4);
      const genresList = data.genres.filter(genre => genre_ids.includes(genre.id))
      .map(item => item.name);
      const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
      const voteAverage = vote_average.toFixed(1);

     return `
     <li class="movies__item" id=${id}>
        <div class="movies__wrapper">
        <img onerror="this.onerror=null;this.src='${defaultImage}';"
         alt=${title} src=${posterLink} class="movies__poster" loading="lazy">
        </div>
        <div class="movies__meta">
          <h2 class="movies__title">${title}</h2>
          <div class="movies__desc">
            <span class="movies__desc-genres">${genres}</span>|
            <span class="movies__desc-release-year">${releaseYear}</span>
            <span class="movies__vote is-hidden">${voteAverage}</span>
          </div>
        </div>
      </li>`;
     })
 }     

 export function createGalleryMarkup(data) {
  const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`; ///////////

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
     alt=${title} src=${posterLink} onerror="this.onerror=null;this.src='${defaultImage}';" class="movies__poster" loading="lazy">
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


 export function createModalMarkup(data) {
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