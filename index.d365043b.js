function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r),r("kyEFX").register(JSON.parse('{"5ZPII":"index.d365043b.js","32lSb":"empty-list.42b24b97.gif","5UbS1":"index.28ddbefc.css","b9auz":"index.ca5823cd.js"}'));var a,s=r("7Y9D8"),o=r("cnvsZ"),l=r("kkejX"),c=r("04jNI"),p=r("jjYMT"),f=r("dpZmf");a=new URL(r("kyEFX").resolve("32lSb"),import.meta.url).toString();const u=document.querySelector(".movies"),y=document.querySelector(".js-form"),d=document.querySelector(".tui-pagination"),g=p.pagination.getCurrentPage(),m=document.querySelector(".btn-to-top");async function v(t){const i=t.page;try{(0,c.spinnerStart)();const e=await o.ApiService.getMoviesByName(i),t=await o.ApiService.getGenresList(),{data:n}=e,{page:r,results:a,total_pages:s,total_results:p}=n,f=(0,l.createMainMarkup)(a,t).join("");u.innerHTML=f}catch(t){return d.classList.add("is-hidden"),console.log(error),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty."/>\n    </li>`,s.Notify.failure("Something went wrong. Please try again later.")}finally{(0,c.spinnerStop)()}}async function h(t){const i=t.page;try{(0,c.spinnerStart)();const e=await o.ApiService.getTrendMovies(i),t=await o.ApiService.getGenresList(),{data:n}=e,{page:r,results:a,total_pages:s,total_results:p}=n,f=(0,l.createMainMarkup)(a,t).join("");u.innerHTML=f}catch(t){return d.classList.add("is-hidden"),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty." />\n    </li>`,console.log(t),s.Notify.failure("Something went wrong. Please try again later.")}finally{(0,c.spinnerStop)()}}y.addEventListener("submit",(function(t){t.preventDefault();const i=t.currentTarget.elements.query.value.trim();if(!i)return s.Notify.failure("Please insert the name of the movie.");if(d.classList.add("is-hidden"),p.pagination.off("afterMove",h),p.pagination.off("afterMove",v),p.pagination.on("afterMove",v),o.ApiService.query=i,""===o.ApiService.query)return s.Notify.failure("Please insert the name of the movie.");y.reset(),u.innerHTML="",async function(){try{(0,c.spinnerStart)();const t=await o.ApiService.getMoviesByName(g),i=await o.ApiService.getGenresList(),{data:n}=t,{page:r,results:f,total_pages:y,total_results:m}=n;if(p.pagination.reset(m),0===f.length)return(0,c.spinnerStop)(),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty."/>\n    </li>`,s.Notify.failure("Sorry, there are no movies matching your search query. Please try again.");0!==m&&s.Notify.success(`Hooray! We found ${m} movies.`);const v=(0,l.createMainMarkup)(f,i).join("");u.innerHTML=v,d.classList.remove("is-hidden")}catch(t){return console.log(t),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty."/>\n    </li>`,s.Notify.failure("Something went wrong. Please try again later.")}finally{(0,c.spinnerStop)()}}()})),window.addEventListener("scroll",f.onScroll),m.addEventListener("click",f.onToTopBtn),s.Notify.init({width:"400px",clickToClose:!0}),async function(){try{(0,c.spinnerStart)();const t=await o.ApiService.getTrendMovies(g),i=await o.ApiService.getGenresList(),{data:n}=t,{page:r,results:f,total_pages:y,total_results:m}=n;if(p.pagination.reset(m),0===f.length)return(0,c.spinnerStop)(),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty."/>\n    </li>`,s.Notify.failure("Trending movies are not available. Please insert the name of the movie.");const v=(0,l.createMainMarkup)(f,i).join("");u.innerHTML=v,d.classList.remove("is-hidden")}catch(t){return console.log(t),u.innerHTML=`<li>\n      <p class="empty__notify">where is everyone?</p>\n      <img src="${e(a)}" alt="The list is empty."/>\n    </li>`,s.Notify.failure("Something went wrong. Please try again later.")}finally{(0,c.spinnerStop)()}}(),p.pagination.on("afterMove",h),r("2ix2C"),r("bTcpz"),r("2hk79");
//# sourceMappingURL=index.d365043b.js.map