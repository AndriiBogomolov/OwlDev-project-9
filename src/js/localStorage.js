import Notiflix from 'notiflix';
import {onModalWindowOpen} from './modal_film'
import { refs } from './refs';


const modal = document.querySelector('.modal-film');
const modalFilmWatched = document.querySelector(".button-watched");
const modalFilmQueue = document.querySelector(".button-queue");

modalFilmWatched.addEventListener('click', onModalButtonsW);
modalFilmQueue.addEventListener('click', onModalButtonsQ);


function onModalButtonsW (e){
  const film = JSON.parse(e.target.dataset.info)
  console.log(e.target.dataset.info)
  
  let saveWatch = localStorage.getItem('watch')
  console.log(saveWatch)
  if (saveWatch) {
    saveWatch = JSON.parse(saveWatch)
  } else {
    saveWatch = [];
  } 
    const isexist = saveWatch.find(el =>
    el.id === film.id)
    
    
  if (isexist) {
      saveWatch = saveWatch.filter(el =>
      el.id !== film.id)
      refs.modalFilmWatched.textContent = "ADD TO WATCH"
      Notiflix.Notify.success(
        'Film add to watch');
  } else {
    saveWatch.push(film)
    refs.modalFilmWatched.textContent = "REMOVE FROM WATCH"
    Notiflix.Notify.failure('Film remove from watch')
  }
  localStorage.setItem('watch', JSON.stringify(saveWatch))
}

function onModalButtonsQ (e){
  const film = JSON.parse(e.target.dataset.info)
  console.log(e)
  
  let saveQueue = localStorage.getItem('queue')
  console.log(saveQueue)
  if (saveQueue) {
    saveQueue = JSON.parse(saveQueue)
  } else {
    saveQueue = [];
  } 
    const isexist = saveQueue.find(el =>
    el.id === film.id)
    
  if (isexist) {
    saveQueue = saveQueue.filter(el =>
      el.id !== film.id)
      refs.modalFilmQueue.textContent = "ADD TO QUEUE"
      Notiflix.Notify.success(
        'Film add to queue');
  } else {
    saveQueue.push(film)
    refs.modalFilmQueue.textContent = "REMOVE FROM QUEUE"
    Notiflix.Notify.failure('Film remove from watch')
  }
  localStorage.setItem('queue', JSON.stringify(saveQueue))
}