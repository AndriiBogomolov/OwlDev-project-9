const cardList = document.querySelector('.card')
const URLmain= 'https://api.themoviedb.org/3/trending/movie/day/94xxm5701CzOdJdUEdIuwqZaowx.jpg?api_key=177f83f5259c7f846e561f4715bd03a4'
const URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4';

 function fetchPopular() { 
     return fetch(URL).then(responce => { 
        if (!responce.ok) { 
            throw new Error(responce.statusText); 
        }  return responce.json()
     })
}

function renderList(films) { 
    films.results.map(film => cardList.innerHTML+=`<li class="card__item item">
                  <a class="card__link link" href="#" data-modal-open>
                    <div class="card__thumb">
                      <img                       
                        sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"
                        src=""
                        alt="tehnocryak"
                        width="100%"
                      />
                    </div>
                    <div class="card__meta">
                      <h2 class="card__heading">${film.original_title}</h2>
                      <p class="card__lead">genre | year</p>
                    </div>
                  </a>
                </li>`)
}

function markupPopular() { 
    fetchPopular().then(films =>renderList(films)).catch(error=>console.log(error))
}

markupPopular()
 
console.log(cardList)





