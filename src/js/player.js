import { ApiService } from './ApiServise';
import { Notify } from 'notiflix';

const player = document.querySelector('.player');
const modal = document.querySelector('[data-modal]');

modal.addEventListener('click', onClose);

export default async function findMovieTrailer(id) {
    try {
      const response = await ApiService.getMovieTreiler(id);
      const { data } = response;
  
      const videoKey = data.results.find(result => result.type === 'Trailer' && result.official).key;
      videoID = videoKey;
  
      createPlayer(videoID);
      
      window.addEventListener('keydown', onEscPress)
  
    } catch (error) {
      console.log(error);
      return Notify.failure('Sorry, there no trailer to this film!');
    }
  }
  
  function createPlayer (id) {
    const frame = `<iframe class="player__frame" id="player" type="text/html"
    src="http://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com"frameborder="0"></iframe>`;
    player.innerHTML = frame;
  }

  function onEscPress(e) {
    if (e.key !== 'Escape') {
      return
    }
    player.innerHTML = '';
    window.removeEventListener('keydown', onEscPress)
  }

  function onClose(e) {
    if (e.target !== player) {
      player.innerHTML = '';
    }
  }
