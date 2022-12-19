
const modal = document.querySelector('.modal-film');
const blockBtnAdd = document.querySelector('.block-btn__add');

const watchedList = JSON.parse(localStorage.getItem('watched movies') || '[]');
const queueList = JSON.parse(localStorage.getItem('In queue') || '[]');

modal.addEventListener('click', onModalButtons);

function onModalButtons(){
}

function insertToStorage(data, list, state) {
    const destr = destructObj(data);
    list.push(destr);
    localStorage.setItem(state, JSON.stringify(list));
  }
  
  function destructObj({
    id,
    overview,
    backdrop_path,
    original_title,
    poster_path,
    release_date,
    popularity,
    vote_average,
    genres,
  }) {
    return {
      id,
      overview,
      backdrop_path,
      original_title,
      poster_path,
      release_date,
      popularity,
      vote_average,
      genres,
    };
  }
