import { ApiService } from "./ApiServise";

// const btnAddToWatched = document.querySelector('.btn_add_watched');
// const btnAddToQueue = document.querySelector('.btn_add_queue');

 const onBtnClick = async function (event, storageKey) {
    const movieId = event.target.dataset.id;
    const response = await ApiService.getMoviesById(movieId);
    const movieData = response.data;
    console.log(movieData);
    const arrMovie = [];

    let queueMovie = JSON.parse(localStorage.getItem(storageKey));
    if(!queueMovie){
        queueMovie = [];
    }

    const tempMovie = queueMovie.find((movie) => {
        return movie.id == movieData.id;
    });
    console.log(tempMovie)
    if (tempMovie){
        return;
    };
    
    queueMovie.push(movieData);
    
    localStorage.setItem(storageKey, JSON.stringify(queueMovie));

}; 

// btnAddToWatched.addEventListener('click', (event) => onBtnClick(event, 'WATCHED'));
// btnAddToQueue.addEventListener('click', (event) => onBtnClick(event, 'QUEUE'));

export default onBtnClick;