const e=document.querySelector(".card");function n(n){n.results.map((n=>{let t=new Date(n.release_date).getFullYear();genre_ids=n.genre_ids;let r=function(e){let n=[];return e.forEach((e=>{n.push(genreIdArr.find((n=>n.id===e)).name)})),n}(genre_ids);return e.innerHTML+=`<li class="card__item item">\n                  <a class="card__link link" href="#" data-modal-open>\n                    <div class="card__thumb">\n                      <img                       \n                        sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"\n                        src='https://www.themoviedb.org/t/p/w500/${n.poster_path}'\n                        alt="tehnocryak"\n                        width="100%"\n                      />\n                    </div>\n                    <div class="card__meta">\n                      <h2 class="card__heading">${n.original_title}</h2>\n                      <p class="card__lead">${r} | ${t}</p>\n                    </div>\n                  </a>\n                </li>`}))}fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=177f83f5259c7f846e561f4715bd03a4&language=en-US").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((e=>{genreIdArr=e.genres})).catch((e=>console.log(e))),fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((e=>n(e))).catch((e=>console.log(e)));
//# sourceMappingURL=index.d25f72ed.js.map
