export default function createMarkup(results, { data }) {
    return results.map(result => {
      const { genre_ids, poster_path, release_date, title, vote_average } = result;
      const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const releaseYear = release_date.slice(0, 4);
      const genresList = data.genres.filter(genre => genre_ids.includes(genre.id))
      .map(item => item.name);
      const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
      const defaultImage = "/src/images/mobile-poster-filler.jpeg";
      const voteAverage = vote_average.toFixed(1);

     return `
     <li class="movies__item">
        <div class="movies__wrapper">
          <img
            loading="lazy"
            class="movies__poster"
            src=${posterLink}
            onerror=${defaultImage}
            alt=${title}
          />
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

          // <picture>
          //   <source
          //     srcset="
          //       ./images/main-home/poster-filler-desktop.jpeg    1x,
          //       ./images/main-home/poster-filler-desktop@2x.jpeg 2x
          //     "
          //     media="(min-width: 1200px)"
          //   />
          //   <source
          //     srcset="
          //       ./images/main-home/poster-filler-tablet.jpeg    1x,
          //       ./images/main-home/poster-filler-tablet@2x.jpeg 2x
          //     "
          //     media="(min-width: 768px)"
          //   />
          //   <source
          //     srcset="
          //       ./images/main-home/poster-filler-mob.jpeg    1x,
          //       ./images/main-home/poster-filler-mob@2x.jpeg 2x
          //     "
          //     media="(min-width: 280px)"
          //   />
          //   <img
          //     loading="lazy"
          //     class="movies__poster"
          //     src="./images/main-home/poster-filler-mob.jpeg"
          //     alt="movies__poster"
          //   />
          // </picture>