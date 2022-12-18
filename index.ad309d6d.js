!function(){var e={openFooterModal:document.querySelector('[data-action="open-lightbox"]'),closeFooterModal:document.querySelector('[data-action="close-lightbox"]'),lightboxFooterModal:document.querySelector(".js-lightbox")};e.openFooterModal.addEventListener("click",(function(){e.lightboxFooterModal.classList.remove("visually-hidden")})),e.closeFooterModal.addEventListener("click",(function(){e.lightboxFooterModal.classList.add("visually-hidden")}));var t={film:document.querySelector("#id"),modalOpen:document.querySelector("[data-film-open]"),modalClose:document.querySelector("[data-film-close]"),modal:document.querySelector("[data-film]"),modalFilmImg:document.querySelector(".modal__img"),modalFilmTitle:document.querySelector(".modal__title"),modalFilmVote:document.querySelector(".vote"),modalFilmVotes:document.querySelector(".votes"),modalFilmPopularity:document.querySelector(".popularity"),modalFilmOrigTitle:document.querySelector(".orig-title"),modalFilmGenre:document.querySelector(".genre"),modalFilmDescription:document.querySelector(".about__text")},o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var n={};function i(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t,o){t&&i(e.prototype,t);o&&i(e,o);return e};var r="177f83f5259c7f846e561f4715bd03a4",a="https://api.themoviedb.org/";init(),refs.searchForm.addEventListener("submit",onSearchForm),function(){function e(){document.body.classList.toggle("film-open"),t.modal.classList.toggle("is-hidden")}t.modalOpen.forEach((function(t){t.addEventListener("click",e)})),t.modalClose.addEventListener("click",e)}(),t.modalOpen.addEventListener("click",(function(e){(o=t.film.getAttribute(id),fetch("".concat(a,"/").concat(o,"?api_key=").concat(r)).then((function(e){if(!e.ok)throw new Error;return e.json()})).catch((function(e){return Notify.failure("Sorry, something goes wrong. Please, try again")}))).then((function(e){return n=(o=e).genres.map((function(e){return e.name})).join(", "),t.modalFilmImg.src="https://image.tmdb.org/t/p/w500/".concat(o.poster_path),t.modalFilmImg.alt="".concat(o.title," poster"),t.modalFilmTitle.textContent=o.title,t.modalFilmVote.textContent=o.vote_average,t.modalFilmVotes.textContent=o.vote_count,t.modalFilmPopularity.textContent=o.popularity,t.modalFilmOrigTitle.textContent=o.original_title,t.modalFilmDescription.textContent=o.overview,void(t.modalFilmGenre.textContent=n);var o,n}));var o}));var l=document.querySelector(".card");function c(e){e.results.map((function(e){var t=new Date(e.release_date).getFullYear();genre_ids=e.genre_ids;var o=function(e){var t=[];return e.forEach((function(e){t.push(genreIdArr.find((function(t){return t.id===e})).name)})),t}(genre_ids);return l.innerHTML+='<li class="card__item item">\n                  <a class="card__link link" href="#" data-modal-open>\n                  <div class="card__thumb">\n                  <img class="card__img"\n                    sizes="(min-width: 1280px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"\n                    src=\'https://www.themoviedb.org/t/p/w500/'.concat(e.poster_path,'\'\n                    alt="tehnocryak"\n                    width="100%"\n                  />\n                </div>\n                <div class="card__meta">\n                  <h2 class="card__title">').concat(e.original_title,'</h2>\n                  <p class="card__info">').concat(o," | ").concat(t,"</p>\n                </div>\n              </a>\n            </li>")}))}fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=177f83f5259c7f846e561f4715bd03a4&language=en-US").then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).then((function(e){genreIdArr=e.genres})).catch((function(e){return console.log(e)})),fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4").then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.log(e)})),window.onload=function(){document.body.classList.add("loaded_hiding"),window.setTimeout((function(){document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")}),500)}}();
//# sourceMappingURL=index.ad309d6d.js.map
