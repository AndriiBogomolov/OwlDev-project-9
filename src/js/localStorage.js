import Notiflix from 'notiflix';
import {onModalWindowOpen} from './modal_film'
import { refs } from './refs';


const modal = document.querySelector('.modal-film');
const modalFilmWatched = document.querySelector(".button-watched");
const modalFilmQueue = document.querySelector(".button-queue");

modal.addEventListener('click', onModalButtons);


function onModalButtons (e){
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
  } else {
    saveWatch.push(film)
    refs.modalFilmWatched.textContent = "REMOVE FROM WATCH"
  }
  localStorage.setItem('watch', JSON.stringify(saveWatch))


  let saveQueue = localStorage.getItem('queue')
console.log(saveQueue)

if (saveQueue) {
  saveQueue = JSON.parse(saveQueue)
} else {
  saveQueue = [];
} 
  const isexistQ = saveQueue.find(el =>
  el.id === film.id)
  
if (isexistQ) {
  saveQueue = saveQueue.filter(el =>
    el.id !== film.id)
    refs.modalFilmQueue.textContent = "ADD TO QUEUE"
} else {
  saveQueue.push(film)
  refs.modalFilmQueue.textContent = "REMOVE FROM QUEUE"
}
localStorage.setItem('queue', JSON.stringify(saveQueue))

}