import { ApiService } from "./ApiServise";



 const onBtnClick = function (event, storageKey) {
    const movieId = event.target.dataset.id;
    console.log(movieId);
    const response = ApiService.getMoviesById(movieId);
    const movieData = response.data;
    console.log(movieData);
    const arrMovie = [];

    let queueMovie = JSON.parse(localStorage.getItem(storageKey));
    console.log(queueMovie);

    if(!queueMovie){
        queueMovie = [];
    }

    const tempMovie = queueMovie.find((movieId) => {
        return movieId;   ///тут меняем имя кнопки
    });
    console.log(tempMovie)
    if (tempMovie){
        return;
    };
    
    queueMovie.push(movieId);
    
    localStorage.setItem(storageKey, JSON.stringify(queueMovie));

}; 

// btnAddToWatched.addEventListener('click', (event) => onBtnClick(event, 'WATCHED'));
// btnAddToQueue.addEventListener('click', (event) => onBtnClick(event, 'QUEUE'));

export default onBtnClick;