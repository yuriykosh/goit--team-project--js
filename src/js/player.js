import { ApiService } from './ApiServise';
import { Notify } from 'notiflix';

const player = document.querySelector('.player');

export default async function findMovieTrailer(id) {
    try {
      const response = await ApiService.getMovieTreiler(id);
      const { data } = response;
  
      console.log(data.results);
  
      const videoKey = data.results.find(
        result => result.type === 'Trailer' && result.official
      ).key;
      videoID = videoKey;
      console.log(videoID);
  
      createPlayer(videoID);
      
      window.addEventListener('keydown', onEscPress)
  
    } catch (error) {
      console.log(error);
      return Notify.failure('Something went wrong. Please try again later.');
    }
  }
  
  function createPlayer (id) {
    const frame = `<iframe class="player__frame" id="player" type="text/html"
    src="http://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com"frameborder="0"></iframe>`;
    player.innerHTML = frame;
  }

  function onEscPress(e) {
    if (e.key !== 'Escape') {
      console.log("esc");
      return
    }
    player.innerHTML = '';
    window.removeEventListener('keydown', onEscPress)
  }
