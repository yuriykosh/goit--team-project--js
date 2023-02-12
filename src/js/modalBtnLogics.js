import localStorageService from "./localStorage-service";
import { ApiService } from "./ApiServise";

const onBtnClick = async function (event, storageKey) {
    let text = event.target.textContent;
    const movieId = event.target.dataset.id;
    const response = await ApiService.getMoviesById(movieId); /// ищем фильм на API
    const movieData = response.data;

    let queueMovie = localStorageService.load(storageKey);  /// запрашиваем что уже есть в сторадже

    if(!queueMovie){                                        /// пушим данные из стореджа в наш массив
        queueMovie = [];
    }

    const tempMovie = queueMovie.find((movie) => {        /// ищем есть ли уже фильм в нашем массиве
        return movie.id == movieData.id;
    });

    if (text.includes('add to') & !tempMovie) {               /// если фильма нет - добавлен в локал
                event.target.textContent = text.replace('add to', 'remove from');
                queueMovie.push(movieData);
            } else{
                event.target.textContent = text.replace('remove from', 'add to');  /// если фильм уже добавлен - фильтруем массив и удаляем его
                queueMovie = queueMovie.filter((movie) => movie.id.toString() !== movieId.toString())
            }

    localStorageService.save(storageKey, queueMovie);         /// пушим новые данные на сторедж
}; 

export default onBtnClick;


//     let idList = localStorageService.load(storageKey);
//     // loadMoviesList(idList);