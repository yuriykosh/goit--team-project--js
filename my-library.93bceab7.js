function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},a={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},n.parcelRequired7c6=r),r.register("kyEFX",(function(t,n){var i,a;e(t.exports,"register",(function(){return i}),(function(e){return i=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var r={};i=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)r[t[n]]=e[t[n]]},a=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r("kyEFX").register(JSON.parse('{"1zJhX":"my-library.93bceab7.js","32lSb":"empty-list.42b24b97.gif","5UbS1":"index.70fc6d1e.css","b9auz":"index.8b494a04.js"}'));var o;o=new URL(r("kyEFX").resolve("32lSb"),import.meta.url).toString();var l=r("jjYMT"),d=r("dpZmf"),s=r("kkejX"),c=r("hvBA4"),u=r("krGWQ");window.addEventListener("scroll",d.onScroll),u.default.watched.addEventListener("click",h),u.default.queued.addEventListener("click",h),u.default.toTopBtn.addEventListener("click",d.onToTopBtn);let f="",p=[],g=0,v=0;function h(e){if(l.pagination.off("afterMove",m),u.default.paginationBlock.classList.add("is-hidden"),f=e.target.dataset.name,p=c.default.load(f),"WATCHED"===f?(u.default.watched.classList.add("is-active"),u.default.queued.classList.remove("is-active")):(u.default.queued.classList.add("is-active"),u.default.watched.classList.remove("is-active")),p.length>20){u.default.paginationBlock.classList.remove("is-hidden"),l.pagination.reset(g);const e=l.pagination.getCurrentPage();return l.pagination.on("afterMove",m),void L(e,p)}b(p)}function b(e){if(0===e.length)return void(u.default.movieList.innerHTML=`\n      <li>\n        <p class="empty__notify">where is everyone?</p>\n        <img src="${t(o)}" alt="The list is empty." />\n      </li>`);const n=(0,s.createGalleryMarkup)(e);u.default.movieList.innerHTML=n.join("")}function L(e,t){let n=[];for(let i=20*(e-1);i<20*e&&i!==t.length;i+=1)n.push(t[i]);b(n)}function m(e){L(e.page,p)}!function(e){if(u.default.paginationBlock.classList.add("is-hidden"),u.default.watched.classList.add("is-active"),l.pagination.off("afterMove",m),f=e,p=c.default.load(f),g=p?p.length:0,v=Math.ceil(g/20),p.length>20){u.default.paginationBlock.classList.remove("is-hidden"),l.pagination.reset(g);const e=l.pagination.getCurrentPage();return l.pagination.on("afterMove",m),void L(e,p)}b(p)}("WATCHED"),r("bTcpz"),r("2hk79");
//# sourceMappingURL=my-library.93bceab7.js.map
