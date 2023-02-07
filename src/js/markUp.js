export default function createMarkup(results, { data }) {
    return results.map(result => {
      const { genre_ids, poster_path, release_date, title, vote_average } = result;
      const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const release_year = release_date.slice(0, 4);
      const genresList = data.genres.filter((genre, index) => genre_ids.includes(genre.id))
      .map(item => item.name);
      const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');

     return `
     <li class="film__card">
       <a>
         <img class="film__poster" src=${posterLink} alt=${title} loading="lazy" />
         <div class="film__info">
           <p class="film__name">
           ${title}
             <span class="film__details">
               ${genres} | ${release_year}
             </span>
           </p>
         </div>
       </a>
     </li>`;
     })
 }     