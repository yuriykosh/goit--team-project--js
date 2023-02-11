import localStorageService from "./localStorage-service";

const onBtnClick = function (event, storageKey) {
    let text = event.target.textContent;
    const movieId = event.target.dataset.id;
    
    let queueMovie = localStorageService.load(storageKey);

    if(!queueMovie){
        queueMovie = [];
    }

    if (text.includes('add to')) {
        event.target.textContent = text.replace('add to', 'remove from');
        queueMovie.push(movieId.toString());
        localStorageService.save(storageKey, queueMovie);
    } else{
        event.target.textContent = text.replace('remove from', 'add to');
        queueMovie = queueMovie.filter((item) => item !== movieId)
        localStorageService.save(storageKey, queueMovie);
    }

    let idList = localStorageService.load(storageKey);
    // loadMoviesList(idList);
}; 

export default onBtnClick;