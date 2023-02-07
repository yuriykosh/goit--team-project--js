export default function createMarkup(results) {

    return results.map(result => {
         console.log(result);
             const { genre_ids, original_title, overview, popularity, poster_path, release_date, title, vote_average } = result;
 
     return `
     <li class="film__card">
       <a>
         <img class="film__poster" src=${poster_path} alt=${title} loading="lazy" />
         <div class="film__info">
           <p class="film__name">
           ${title}
             <span class="film__details">
               
             </span>
           </p>
         </div>
       </a>
     </li>`;
     })
 }     