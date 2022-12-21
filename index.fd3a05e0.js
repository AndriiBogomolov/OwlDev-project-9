function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequired7c6=i);var r=i("eWCmQ");const a={modalFilmImg:document.querySelector(".modal__img"),modalFilmId:document.querySelector(".modal-film__id"),modalFilmTitle:document.querySelector(".modal-film__title"),modalFilmVote:document.querySelector(".vote"),modalFilmVotes:document.querySelector(".votes"),modalFilmPopularity:document.querySelector(".popularity"),modalFilmOrigTitle:document.querySelector(".orig-title"),modalFilmGenre:document.querySelector(".genre"),modalFilmDescription:document.querySelector(".about__text"),modalTrailerWatch:document.querySelector(".modal__watch"),modalFilmWatched:document.querySelector(".button-watched"),modalFilmQueue:document.querySelector(".button-queue"),searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".card"),paginationList:document.querySelector(".pagination-mid"),pageList:document.querySelector(".pages"),lastBtn:document.getElementById("last-page"),prevBtn:document.getElementById("button-prev"),nextBtn:document.getElementById("button-next"),firstPage:document.querySelector(".first"),lastPage:document.querySelector(".last")};r=i("eWCmQ");const l=document.querySelector(".card"),c=document.querySelector(".backdrop"),s=document.querySelector(".close-button");function d(){c.classList.add("is-hidden"),document.body.style.overflow="visible"}function u(e){"Escape"===e.code&&(document.removeEventListener("keydown",u),d())}l.addEventListener("click",(function(e){if(e.preventDefault(!e.target.closest("li")))return void e.preventDefault();if(e.target.closest("li")){(function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=0f09f0e29eb26a1e28b4809ac59dbd60`).then((e=>{if(!e.ok)throw new Error;return e.json()})).catch((e=>r.Notify.failure("Sorry, something goes wrong. Please, try again")))})(e.target.closest("a").getAttribute("id")).then((e=>function(e){const t=e.genres.map((e=>e.name)).join(", ");let n=localStorage.getItem("watch");n=n?JSON.parse(n):[];const o=n.find((t=>t.id===e.id));let i=localStorage.getItem("queue");i=i?JSON.parse(i):[];const r=i.find((t=>t.id===e.id));a.modalFilmImg.src=`https://image.tmdb.org/t/p/w500/${e.poster_path}`,a.modalFilmImg.alt=`${e.title} poster`,a.modalFilmTitle.textContent=e.title,a.modalFilmId.textContent=e.id,a.modalFilmVote.textContent=e.vote_average,a.modalFilmVotes.textContent=e.vote_count,a.modalFilmPopularity.textContent=e.popularity,a.modalFilmOrigTitle.textContent=e.original_title,a.modalFilmDescription.textContent=e.overview,a.modalFilmGenre.textContent=t,a.modalFilmWatched.dataset.info=JSON.stringify(e),a.modalFilmQueue.dataset.info=JSON.stringify(e),a.modalFilmWatched.textContent=o?"REMOVED FORM WATCHED":"ADD TO WATCHED",a.modalFilmQueue.textContent=r?"REMOVED FORM QUEUE":"ADD TO QUEUE"}(e))),document.body.style.overflow="hidden",c.classList.remove("is-hidden"),document.addEventListener("keydown",u)}})),s.addEventListener("click",d),c.addEventListener("click",(function(e){e.currentTarget===e.target&&d()}));document.querySelector(".modal-film");const m=document.querySelector(".button-watched"),f=document.querySelector(".button-queue");m.addEventListener("click",(function(t){const n=JSON.parse(t.target.dataset.info);console.log(t.target.dataset.info);let o=localStorage.getItem("watch");console.log(o),o=o?JSON.parse(o):[];o.find((e=>e.id===n.id))?(o=o.filter((e=>e.id!==n.id)),a.modalFilmWatched.textContent="ADD TO WATCH",e(r).Notify.failure("Film remove from watch")):(o.push(n),a.modalFilmWatched.textContent="REMOVE FROM WATCH",e(r).Notify.success("Film add to watch"));localStorage.setItem("watch",JSON.stringify(o))})),f.addEventListener("click",(function(t){const n=JSON.parse(t.target.dataset.info);console.log(t);let o=localStorage.getItem("queue");console.log(o),o=o?JSON.parse(o):[];o.find((e=>e.id===n.id))?(o=o.filter((e=>e.id!==n.id)),a.modalFilmQueue.textContent="ADD TO QUEUE",e(r).Notify.failure("Film remove from watch")):(o.push(n),a.modalFilmQueue.textContent="REMOVE FROM QUEUE",e(r).Notify.success("Film add to queue"));localStorage.setItem("queue",JSON.stringify(o))}));const g={openFooterModal:document.querySelector('[data-action="open-lightbox"]'),closeFooterModal:document.querySelector('[data-action="close-lightbox"]'),lightboxFooterModal:document.querySelector(".js-lightbox"),backdropClick:document.querySelector(".lightbox"),body:document.querySelector("body")};function h(){window.removeEventListener("keydown",p),g.lightboxFooterModal.classList.add("visually-hidden"),g.body.classList.remove("on-scroll")}function p(e){"Escape"===e.code&&(h(),g.body.classList.remove("on-scroll"))}g.openFooterModal.addEventListener("click",(function(){window.addEventListener("keydown",p),g.lightboxFooterModal.classList.remove("visually-hidden"),g.body.classList.add("on-scroll")})),g.closeFooterModal.addEventListener("click",h),g.backdropClick.addEventListener("click",(function(e){e.currentTarget===e.target&&(h(),g.body.classList.remove("on-scroll"))}));const y=document.querySelector(".card");let b;function v(e){e.results.map((e=>{let t=new Date(e.release_date).getFullYear(),n=function(e){let t=[];return e.forEach((e=>{t.push(b.find((t=>t.id===e)).name)})),t}(e.genre_ids);return y.innerHTML+=`<li class="card__item item">\n\n                  <a class="card__link link" href="#" id="${e.id}" data-id="${e.id}" data-film-open>\n                    <div class="card__thumb">\n                      <img class="card__img"                      \n                        sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"\n                        src='https://www.themoviedb.org/t/p/w500/${e.poster_path}'\n                        alt="tehnocryak"\n                        width="100%"\n                        class="card__img"\n                      />\n                    </div>\n                    <div class="card__meta">\n                      <h2 class="card__title">${e.original_title}</h2>\n                      <p class="card__info">${n} | ${t}</p>\n                    </div>\n                  </a>\n                </li>`}))}fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=177f83f5259c7f846e561f4715bd03a4&language=en-US").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((e=>(b=e.genres,b))).catch((e=>console.log(e))),window.onload=function(){document.body.classList.add("loaded_hiding"),window.setTimeout((function(){document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")}),500)};var w={};w=function e(t,n,o){function i(a,l){if(!n[a]){if(!t[a]){var c=void 0;if(!l&&c)return c(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var d=n[a]={exports:{}};t[a][0].call(d.exports,(function(e){return i(t[a][1][e]||e)}),d,d.exports,e,t,n,o)}return n[a].exports}for(var r=void 0,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},i=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},r=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=r,n.create=function(e,t){var n=function(e,t){var n=o('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),r=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return r.appendChild(e)}));var a=i(r,"IMG"),l=i(r,"VIDEO"),c=i(r,"IFRAME");return!0===a&&n.classList.add("basicLightbox--img"),!0===l&&n.classList.add("basicLightbox--video"),!0===c&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),a=function(e){return!1!==t.onClose(l)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===r(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(l)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&a()}));var l={element:function(){return n},visible:function(){return r(n)},show:function(e){return!1!==t.onShow(l)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(l)}))},close:a};return l}},{}]},{},[1])(1);r=i("eWCmQ");a.modalTrailerWatch.addEventListener("click",(function(e){e.preventDefault();!function(e){(function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=0f09f0e29eb26a1e28b4809ac59dbd60`).then((e=>{if(!e.ok)throw new Error;return e.json()})).catch((e=>r.Notify.failure("Sorry, something goes wrong. Please, try again")))})(e).then((e=>{if(0!==e.results.length){const t=e.results.filter((t=>t.official?t.official:e.results[0].key))[0].key,n=w.create(`\n      <iframe src="https://www.youtube.com/embed/${t}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n  `);n.show(),function(e){document.querySelector(".basicLightbox--iframe").insertAdjacentHTML("afterbegin",'<button\n        type="button"\n        class="modal-film__btn trailer-btn"\n        data-trailer-close\n        >\n        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>\n        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>\n        </svg>\n        </button>\n    ');document.querySelector("[data-trailer-close]").addEventListener("click",(t=>{e.close()}))}(n)}}))}(a.modalFilmId.textContent)}));r=i("eWCmQ");const L=document.querySelector("input"),E=document.querySelector("button");const S=new class{fetchPopularMovies(){const e=`https://api.themoviedb.org/3/trending/movie/day?api_key=0f09f0e29eb26a1e28b4809ac59dbd60&page=${this.page}`;return fetch(e).then((e=>e.json()))}fetchMoviesByRequest(){const e=`https://api.themoviedb.org/3/search/movie?api_key=0f09f0e29eb26a1e28b4809ac59dbd60&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;return fetch(e).then((e=>e.json()))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}clearInput(){this.searchQuery.innerHTML=""}pagination(e){this.page=e}constructor(){this.page=1,this.searchQuery=""}};let x,_=1;function q(){S.fetchMoviesByRequest().then((t=>{console.log(t),0==t.total_results&&(e(r).Notify.failure('"Sorry, there are no film with this name. Please try again."'),S.query="",F()),x=t.total_pages,a.lastBtn.textContent=x,v(t),k()})).catch((e=>console.log(e)))}function F(){S.fetchPopularMovies().then((e=>{x=e.total_pages,a.lastBtn.textContent=x,k(),v(e)})).catch((e=>console.log(e)))}function k(){a.prevBtn.disabled=1===_,a.nextBtn.disabled=_===x,a.firstPage.hidden=_<4,a.lastPage.hidden=_>x-3,function(){const e=_+2;for(let t=_-2;t<=e;t+=1)t>0&&t<=x&&a.pageList.insertAdjacentHTML("beforeend",`<li class="pages-item"><button type="button" class="pagination-btn">${t}</button></li>`)}(),function(){let e=a.pageList.querySelectorAll("button");for(let t=0;t<e.length;t+=1)Number(e[t].textContent)===_&&e[t].classList.add("active-btn")}()}E.addEventListener("click",(function(t){if(t.preventDefault(),S.query=L.value.trim(),""===S.query.trim())return void e(r).Notify.failure("Please enter the text in search field");a.gallery.innerHTML="",a.pageList.innerHTML="",S.resetPage(),_=1,q()})),a.paginationList.addEventListener("click",(function(e){if(e.preventDefault(),"BUTTON"!==e.target.nodeName)return;a.gallery.innerHTML="",a.pageList.innerHTML="",_=Number(e.target.textContent),S.pagination(_),S.query?q():F()})),a.prevBtn.addEventListener("click",(function(e){e.preventDefault(),_>1&&(_-=1);a.gallery.innerHTML="",a.pageList.innerHTML="",S.pagination(_),S.query?q():F()})),a.nextBtn.addEventListener("click",(function(e){e.preventDefault(),_!==x&&(_+=1);a.gallery.innerHTML="",a.pageList.innerHTML="",S.pagination(_),S.query?q():F()})),S.pagination(_),F();
//# sourceMappingURL=index.fd3a05e0.js.map
