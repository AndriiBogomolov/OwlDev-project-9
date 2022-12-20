const cardList = document.querySelector('.card');
const URL =
  'https://api.themoviedb.org/3/trending/movie/day?api_key=177f83f5259c7f846e561f4715bd03a4';

const URLgenre =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=177f83f5259c7f846e561f4715bd03a4&language=en-US';

let genreIdArr;

function fetchGenres() {
  return fetch(URLgenre).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}

function getGenre(genre_ids) {
  let genreName = [];
  genre_ids.forEach(genre_id => {
    genreName.push(genreIdArr.find(genre => genre.id === genre_id).name);
  });
  return genreName;
}

fetchGenres()
  .then(genreId => {
    genreIdArr = genreId.genres;
    return genreIdArr;
    //console.log(genreIdArr)
  })
  .catch(error => console.log(error));

function fetchPopular() {
  return fetch(URL).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}

export default function renderList(films) {
  films.results.map(film => {
    let year = new Date(film.release_date);
    let yearRelease = year.getFullYear();
    let genre_ids = film.genre_ids;

    let genres = getGenre(genre_ids);

    return (cardList.innerHTML += `<li class="card__item item">

                  <a class="card__link link" href="#" id="${film.id}" data-id="${film.id}" data-film-open>
                    <div class="card__thumb">
                      <img class="card__img"                      
                        sizes="(min-width: 1200px) 370px, (min-width: 768px) 354px, (max-width: 767px) 450px, 100vw"
                        src='https://www.themoviedb.org/t/p/w500/${film.poster_path}'
                        alt="tehnocryak"
                        width="100%"
                        class="card__img"
                      />
                    </div>
                    <div class="card__meta">
                      <h2 class="card__title">${film.original_title}</h2>
                      <p class="card__info">${genres} | ${yearRelease}</p>
                    </div>
                  </a>
                </li>`);
  });
}

// function markupPopular() {
//   fetchPopular()
//     .then((films) => renderList(films))
//     .catch((error) => console.log(error));
// }

// markupPopular();
