var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var a=n("cnvsZ"),i=n("7Y9D8"),l=n("04jNI");a=n("cnvsZ"),i=n("7Y9D8");const r=document.querySelector(".player");async function d(e){try{const t=await a.ApiService.getMovieTreiler(e),{data:o}=t,n=o.results.find((e=>"Trailer"===e.type&&e.official)).key;videoID=n,function(e){const t=`<iframe class="player__frame" id="player" type="text/html"\n    src="http://www.youtube.com/embed/${e}?enablejsapi=1&origin=http://example.com"frameborder="0"></iframe>`;r.innerHTML=t}(videoID),window.addEventListener("keydown",s)}catch(e){return console.log(e),i.Notify.failure("Something went wrong. Please try again later.")}}function s(e){"Escape"===e.key&&(r.innerHTML="",window.removeEventListener("keydown",s))}document.querySelector("[data-modal]").addEventListener("click",(function(e){e.target!==r&&(r.innerHTML="")}));var c=function(e,t){let o=e.target.textContent;const n=e.target.dataset.id;let a=JSON.parse(localStorage.getItem(t));a||(a=[]),o.includes("add to")?(e.target.textContent=o.replace("add to","remove from"),a.push(n),localStorage.setItem(t,JSON.stringify(a))):(e.target.textContent=o.replace("remove from","add to"),a=a.filter((e=>e!==n)),console.log(a),localStorage.setItem(t,JSON.stringify(a)))};document.querySelector("[data-modal-close]");const m=document.querySelector("[data-modal]"),_=document.querySelector(".movies"),u=document.querySelector(".movie-modal");function v(e){"BUTTON"!==e.target.nodeName&&((e.target.closest(".movie-modal")&&!e.target.closest("[data-modal-close]")||e.keyCode)&&27!==e.keyCode||(!function(){m.classList.add("is-hidden"),document.body.style.overflow="visible";const e=document.querySelector(".movie-modal__wrapper");m.removeAttribute("id"),e.remove()}(),document.removeEventListener("keydown",v),m.removeEventListener("click",v)))}function p(e){d(e.target.closest("[data-modal]").id)}_.addEventListener("click",(function(e){const t=e.target.closest(".movies__item");t&&(m.setAttribute("id",t.id),o=t.id,m.classList.remove("is-hidden"),document.body.style.overflow="hidden",async function(e){try{(0,l.spinnerStart)();const t=await a.ApiService.getMoviesById(e),{data:o}=t,n=function(e){const{genres:t,poster_path:o,title:n,vote_average:a,id:i,vote_count:l,popularity:r,original_title:d,overview:s}=e;let c="",m="";const _=JSON.parse(localStorage.getItem("WATCHED"))?JSON.parse(localStorage.getItem("WATCHED")):[];c=_&&_.find((e=>Number(e)===i))?"remove from watched":"add to watched";const u=JSON.parse(localStorage.getItem("QUEUE"))?JSON.parse(localStorage.getItem("QUEUE")):[];m=u?u.find((e=>Number(e)===i))?"remove from queue":"add to queue":"add to watched";const v="https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg",p=`https://image.tmdb.org/t/p/w500/${o}`,f=t.map((e=>e.name)),g=f.length>2?[f[0],f[1],"Other"].join(", "):f.join(", "),y=a.toFixed(1),b=r.toFixed(1);return`<div class="movie-modal__wrapper">\n    <div class="movie-modal__imgBox">\n    <button class="movie-modal__video-btn js-playBtn">\n      <span class="material-icons-round" style="font-size: 80px">play_circle</span>\n    </button>\n    <img class="movie-modal__imgBox__img" src=${p}\n      alt=${n} onerror="this.onerror=null;this.src='${v}';"/>\n  </div>\n  <div>\n    <div>\n      <h2 class="movie-modal__title">${n}</h2>\n      <ul class="movie-modal__info">\n        <li class="movie-modal__info__item">\n          <p class="movie-modal__info__item__attribute">Vote / Votes</p>\n          <p class="movie-modal__info__item__value">\n            <span class="movie-modal__info__item__value__marker">${y}</span><span\n              class="movie-modal__info__item__value-slash">/</span>\n            <span class="movie-modal__info__item__value__marker--grey">${l}</span>\n          </p>\n        </li>\n        <li class="movie-modal__info__item">\n          <p class="movie-modal__info__item__attribute">Popularity</p>\n          <p class="movie-modal__info__item__value">${b}</p>\n        </li>\n        <li class="movie-modal__info__item">\n          <p class="movie-modal__info__item__attribute">Original Title</p>\n          <p class="movie-modal__info__item__value">${d}</p>\n        </li>\n        <li class="movie-modal__info__item">\n          <p class="movie-modal__info__item__attribute">Genre</p>\n          <p class="movie-modal__info__item__value">${g}</p>\n        </li>\n      </ul>\n    </div>\n    <div class="movie-modal__about">\n      <h3 class="movie-modal__about-title">About</h3>\n      <p class="movie-modal__desc">\n        ${s}\n      </p>\n    </div>\n    <div class="movie-modal__button">\n      <button id="add-to-watched" class="movie-modal__button__item btn_add_watched" data-id=${i}>\n        ${c}\n      </button>\n      <button id="add-to-queue" class="movie-modal__button__item btn_add_queue" data-id=${i}>\n        ${m}\n      </button>\n    </div>\n  </div>\n</div>`}(o);u.insertAdjacentHTML("beforeend",n);const i=document.querySelector(".btn_add_watched"),r=document.querySelector(".btn_add_queue");i.addEventListener("click",(e=>c(e,"WATCHED"))),r.addEventListener("click",(e=>c(e,"QUEUE"))),document.querySelector(".js-playBtn").addEventListener("click",p)}catch(e){return console.log(e),i.Notify.failure("Something went wrong. Please try again later.")}finally{(0,l.spinnerStop)()}}(o),m.addEventListener("click",v),document.addEventListener("keydown",v));var o}));
//# sourceMappingURL=index.90855a98.js.map
