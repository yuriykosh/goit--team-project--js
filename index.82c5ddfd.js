!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var i,a=o("bpxeT"),u=o("2TvXO"),d=o("2nBDz"),c=document.querySelector(".btn_add_watched"),l=document.querySelector(".btn_add_queue"),s=(i=e(a)(e(u).mark((function t(n,r){var o,i,a,c,l;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.target.dataset.id,e.next=3,d.ApiService.getMoviesById(o);case 3:if(i=e.sent,a=i.data,console.log(a),(c=JSON.parse(localStorage.getItem(r)))||(c=[]),l=c.find((function(e){return e.id==a.id})),console.log(l),!l){e.next=13;break}return e.abrupt("return");case 13:c.push(a),localStorage.setItem(r,JSON.stringify(c));case 15:case"end":return e.stop()}}),t)}))),function(e,t){return i.apply(this,arguments)});c.addEventListener("click",(function(e){return s(e,"WATCHED")})),l.addEventListener("click",(function(e){return s(e,"QUEUE")}))}();
//# sourceMappingURL=index.82c5ddfd.js.map
