import localStorageService from "./localStorage-service";
import { ApiService } from "./ApiServise";
import { createGalleryMarkup } from "./markUp";
import refs from "./refs";
import empty from '../images/empty-list.gif';

const onBtnClick = async function (event, storageKey) {
    let text = event.target.textContent;
    const movieId = event.target.dataset.id;
    const response = await ApiService.getMoviesById(movieId); 
    const movieData = response.data;

    let queueMovie = localStorageService.load(storageKey);  

    if(!queueMovie){                                       
        queueMovie = [];
    }

    const tempMovie = queueMovie.find((movie) => {       
        return movie.id == movieData.id;
    });

    if (text.includes('add to') & !tempMovie) {               
                event.target.textContent = text.replace('add to', 'remove from');
                queueMovie.push(movieData);
            } else{
                event.target.textContent = text.replace('remove from', 'add to');  
                queueMovie = queueMovie.filter((movie) => movie.id.toString() !== movieId.toString())
            }

    localStorageService.save(storageKey, queueMovie);  

    if (document.title === 'My Library') {
        console.log(queueMovie);
        if (queueMovie.length === 0) {
            refs.movieList.innerHTML = `
            <li>
              <p class="empty__notify">where is everyone?</p>
              <img src="${empty}" alt="The list is empty." />
            </li>`;
          return;
        }
      const galeryMarkUp = createGalleryMarkup(queueMovie);
      refs.movieList.innerHTML = galeryMarkUp;
    }
}; 

export default onBtnClick;
