import Notiflix from 'notiflix';
import './modal_film'

const LOCAL_STORGE_WATCHED = 'local-storage-watched';
const LOCAL_STORGE_QUEUE = 'local-storage-queue';

document.addEventListener('click', handleClickMainPage);

function handleClickMainPage(e){
    if(!e.target.dataset.add && (e.target.dataset.add !== 'watched' || e.target.dataset.add !== 'queue')){
        return;
    }
    saveToLocalStorage(e.target.dataset.add, e, handleData);
}

function saveToLocalStorage(type, e, handle) {
    const modal = document.querySelector('.modal-film');
    const film = {
      id: parseInt(modal.querySelector('[data-id]').dataset.id),
      src: modal.querySelector('img').src,
      alt: modal.querySelector('img').alt,
      vote: modal.querySelector('[data-vote]').dataset.vote,
      date: modal.querySelector('[data-date]').dataset.date.slice(0, 4),
      genre: modal.querySelector('[data-genre]').textContent,
    };
  
    const local = {
      watched: {
        key: LOCAL_STORGE_WATCHED,
        data: getData(LOCAL_STORGE_WATCHED),
      },
      queue: {
        key: LOCAL_STORGE_QUEUE,
        data: getData(LOCAL_STORGE_QUEUE),
      },
    };
  
      handle({local, type, film, e});
  }

  function handleData({local, type, film, e}){    
    const key = local[type].key;
    const data = local[type].data;
    let currentData = data;
    const other = type === 'watched' ? 'queue' : 'watched'
    if(data.find(d => d.id === film.id)){
        currentData = data.filter(d => d.id !== film.id);
        save(key, currentData);
        e.target.textContent = `add to ${type}`;
        Notiflix.Notify.warning(`This film removed from your ${type} library`);
    } else if(local[other].data.find(d => d.id === film.id)){
        Notiflix.Notify.warning(`This film already in ${other} library`);
    } else {
        currentData = [...data, film];
        save(key, currentData);
        e.target.textContent = `remove from ${type}`;
        Notiflix.Notify.success(`This film added to your ${type} library`);
    }
    return currentData;
}

function save(key, data){
    data.length ? localStorage.setItem(key, JSON.stringify(data))
                : localStorage.removeItem(key);
}


