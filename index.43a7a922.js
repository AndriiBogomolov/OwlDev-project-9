var cardList=document.querySelector(".card"),URL="https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4",URLgenre="https://api.themoviedb.org/3/genre/movie/list?api_key=177f83f5259c7f846e561f4715bd03a4&language=en-US";function fetchGenres(){return fetch(URLgenre).then((function(n){if(!n.ok)throw new Error(n.statusText);return n.json()}))}function getGenre(n){var e=[];return n.forEach((function(n){e.push(genreIdArr.find((function(e){return e.id===n})).name)})),e}function fetchPopular(){return fetch(URL).then((function(n){if(!n.ok)throw new Error(n.statusText);return n.json()}))}function renderList(n){n.results.map((function(n){var e=new Date(n.release_date).getFullYear();genre_ids=n.genre_ids;var t=getGenre(genre_ids);return cardList.innerHTML+='<li class="card__item item">\n                  <a class="card__link link" href="#" data-modal-open>\n                    <div class="card__thumb">\n                      <img                       \n                        sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"\n                        src=\'https://www.themoviedb.org/t/p/w500/'.concat(n.poster_path,'\'\n                        alt="tehnocryak"\n                        width="100%"\n                      />\n                    </div>\n                    <div class="card__meta">\n                      <h2 class="card__heading">').concat(n.original_title,'</h2>\n                      <p class="card__lead">').concat(t," | ").concat(e,"</p>\n                    </div>\n                  </a>\n                </li>")}))}function markupPopular(){fetchPopular().then((function(n){return renderList(n)})).catch((function(n){return console.log(n)}))}fetchGenres().then((function(n){genreIdArr=n.genres})).catch((function(n){return console.log(n)})),markupPopular();
//# sourceMappingURL=index.43a7a922.js.map
