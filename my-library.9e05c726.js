!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},t=n.parcelRequired7c6;null==t&&((t=function(e){if(e in s)return s[e].exports;if(e in i){var n=i[e];delete i[e];var t={id:e,exports:{}};return s[e]=t,n.call(t.exports,t,t.exports),t.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){i[e]=n},n.parcelRequired7c6=t);var o=t("bpxeT"),r=t("2TvXO"),a=t("6JpON"),l=t("2nBDz");localStorage.setItem("movie",520);var c={watched:document.querySelector(".button-watched"),queued:document.querySelector(".button-queued"),movieList:document.querySelector(".movies")};function d(){return(d=e(o)(e(r).mark((function n(s){var i,t;return e(r).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("hello"),e.prev=1,e.next=4,l.ApiService.getMoviesById(s);case 4:i=e.sent,t=i.data,console.log(t),createMarkup(t),e.next=14;break;case 10:return e.prev=10,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",a.Notify.failure("Something went wrong. Please try again later."));case 14:case"end":return e.stop()}}),n,null,[[1,10]])})))).apply(this,arguments)}function v(){c.movieList.innerHTML=""}c.watched.addEventListener("click",(function(e){v();if(!arrMovie.length)return void(c.movies.innerHTML='\n      <li>\n        <img src="'.concat(empty,'" alt="The list is empty." />\n      </li>'));c.movieList.insertAdjacentHTML("beforeend",'<li class="movies__item">\n        <div class="movies__wrapper">\n          <img loading="lazy" class="movies__poster" src="/mobile-poster-filler.68d38ad9.jpeg" alt="movies__poster">\n        </div>\n        <div class="movies__meta">\n          <h2 class="movies__title">Monster Hunter</h2>\n          <div class="movies__desc">\n            <span class="movies__desc-genres">Drama, Action</span>|\n            <span class="movies__desc-release-year">2020</span>\n            <span class="movies__vote">8.3</span>\n          </div>\n        </div>\n      </li>')})),c.queued.addEventListener("click",(function(e){v();if(!queueMovie.length)return void(c.movies.innerHTML='\n      <li>\n        <img src="'.concat(empty,'" alt="The list is empty." />\n      </li>'));c.movieList.insertAdjacentHTML("beforeend",'<li class="movies__item">\n        <div class="movies__wrapper">\n          <img loading="lazy" class="movies__poster" src="/mobile-poster-filler.68d38ad9.jpeg" alt="movies__poster">\n        </div>\n        <div class="movies__meta">\n          <h2 class="movies__title">Monster Hunter</h2>\n          <div class="movies__desc">\n            <span class="movies__desc-genres">Drama, Action</span>|\n            <span class="movies__desc-release-year">2020</span>\n            <span class="movies__vote">8.3</span>\n          </div>\n        </div>\n      </li>')})),function(e){d.apply(this,arguments)}(505642)}();
//# sourceMappingURL=my-library.9e05c726.js.map