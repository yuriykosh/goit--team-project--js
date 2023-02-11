const onBtnClick = function (event, storageKey) {
    let text = event.target.textContent;
    const movieId = event.target.dataset.id;
    // let queueMovie = [JSON.parse(localStorage.getItem(storageKey))];
    if(!queueMovie){
        queueMovie = [];
    }

    if (event.target.textContent.includes('add to')) {
        event.target.textContent = text.replace('add to', 'remove from');
        queueMovie = [...queueMovie, "movieId"];
        // localStorage.removeItem(storageKey);
        // localStorage.setItem(storageKey, queueMovie);
    } else{
        event.target.textContent = text.replace('remove from', 'add to');
        queueMovie = queueMovie.filter((item) => {item !== movieId})
        // localStorage.removeItem(storageKey);
        // localStorage.setItem(storageKey, queueMovie);
    }


    // if (tempMovie){
    //     return;
    // };
    
    // queueMovie.push(movieId);
    
    // localStorage.setItem(storageKey, JSON.stringify(queueMovie));



  
    // let localWatched = JSON.parse(localStorage.getItem('WATCHED'));
    // if (!localWatched) {
    //   watchedText = 'add to watched';
    // } else {
    //   watchedText = !localWatched.find(item => Number(item) === id) ? "add to watched" : "remove from watched";
    // }
  
    // let localQueue = JSON.parse(localStorage.getItem('QUEUE'));
    // if (!localQueue) {
    //   queueText = 'add to watched';
    // } else {
    //   queueText = !localQueue.find(item => Number(item) === id) ? "add to queue" : "remove from queue";
    // }
}; 

// btnAddToWatched.addEventListener('click', (event) => onBtnClick(event, 'WATCHED'));
// btnAddToQueue.addEventListener('click', (event) => onBtnClick(event, 'QUEUE'));

export default onBtnClick;