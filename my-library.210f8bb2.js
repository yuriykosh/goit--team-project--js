function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},a={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in i)return i[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},n.parcelRequired7c6=o),o.register("kyEFX",(function(t,n){var i,a;e(t.exports,"register",(function(){return i}),(function(e){return i=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var o={};i=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},a=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("kyEFX").register(JSON.parse('{"1zJhX":"my-library.210f8bb2.js","32lSb":"empty-list.42b24b97.gif","5UbS1":"index.6cfcdded.css","b9auz":"index.6aeb38d1.js"}'));var r;r=new URL(o("kyEFX").resolve("32lSb"),import.meta.url).toString();var l=o("jjYMT"),d=o("dpZmf"),s=o("kkejX"),c=o("hvBA4"),u=o("krGWQ");window.addEventListener("scroll",d.onScroll),u.default.watched.addEventListener("click",h),u.default.queued.addEventListener("click",h),u.default.toTopBtn.addEventListener("click",d.onToTopBtn);let f="",p=[],v=0,g=0;function h(e){if(l.pagination.off("afterMove",L),u.default.paginationBlock.classList.add("is-hidden"),f=e.target.dataset.name,p=c.default.load(f),"WATCHED"===f?(u.default.watched.classList.add("is-active"),u.default.queued.classList.remove("is-active")):(u.default.queued.classList.add("is-active"),u.default.watched.classList.remove("is-active")),p.length>20){u.default.paginationBlock.classList.remove("is-hidden"),l.pagination.reset(v);const e=l.pagination.getCurrentPage();return l.pagination.on("afterMove",L),void w(e,p)}b(p)}function b(e){if(0===e.length)return void(u.default.movieList.innerHTML=`\n      <li>\n        <p class="empty__notify">where is everyone?</p>\n        <img src="${t(r)}" alt="The list is empty." />\n      </li>`);const n=(0,s.createGalleryMarkup)(e);u.default.movieList.innerHTML=n.join("")}function w(e,t){let n=[];for(let i=20*(e-1);i<20*e&&i!==t.length;i+=1)n.push(t[i]);b(n)}function L(e){window.scrollTo({top:0,behavior:"smooth"});w(e.page,p)}!function(e){if(u.default.paginationBlock.classList.add("is-hidden"),u.default.watched.classList.add("is-active"),l.pagination.off("afterMove",L),f=e,p=c.default.load(f),v=p?p.length:0,g=Math.ceil(v/20),p.length>20){u.default.paginationBlock.classList.remove("is-hidden"),l.pagination.reset(v);const e=l.pagination.getCurrentPage();return l.pagination.on("afterMove",L),void w(e,p)}b(p)}("WATCHED"),o("bTcpz"),o("2hk79"),o("2ix2C");
//# sourceMappingURL=my-library.210f8bb2.js.map
