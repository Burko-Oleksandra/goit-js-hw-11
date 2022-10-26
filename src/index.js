import Notiflix from 'notiflix';
import axios from 'axios';
import ImageApi from './image-api';
import markUp from './markUp';

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

// Notiflix.Notify.info(
//   "We're sorry, but you've reached the end of search results",
//   {
//     timeout: 3000,
//     cssAnimationStyle: 'zoom',
//     info: {
//       background: 'rgba(175, 177, 184, 1)',
//       textColor: 'rgba(24, 140, 232, 1)',
//       notiflixIconColor: 'rgba(24, 140, 232, 1)',
//     },
//   }
// );

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchEl = document.querySelector('.search-btn');
const loadMoreEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
const imageApi = new ImageApi();

let currentHits = 0;

formEl.addEventListener('submit', onSearch);
loadMoreEl.addEventListener('click', loadMore);

function onSearch(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  imageApi.query = e.currentTarget.elements.searchQuery.value.trim();
  currentHits = 0;

  if (imageApi.query === '') {
    loadMoreEl.classList.add('visually-hidden');
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again',
      {
        timeout: 3000,
        cssAnimationStyle: 'zoom',
        info: {
          background: 'rgba(175, 177, 184, 1)',
          textColor: 'rgba(24, 140, 232, 1)',
          notiflixIconColor: 'rgba(24, 140, 232, 1)',
        },
      }
    );
    return;
  }

  imageApi.resetPage();
  imageApi.fetchImage().then(hits => {
    currentHits += hits.length;
    console.log(currentHits);
    drawMarkup(hits);
  });
  loadMoreEl.classList.remove('visually-hidden');
}

function loadMore() {
  imageApi.fetchImage().then(hits => {
    currentHits += hits.length;
    console.log(currentHits);
    console.log(hits.totalHits);
    drawMarkupMore(hits);
  });
  // Notiflix.Loading.dots('Loading...', {
  //   clickToClose: true,
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  //   svgColor: '#188ce8',
  //   svgSize: '50px',
  //   messageFontSize: '18px',
  //   messageColor: '#188ce8',
  // });
}

function drawMarkup(arrayImages) {
  galleryEl.innerHTML = markUp(arrayImages);
}

function drawMarkupMore(arrayImages) {
  galleryEl.insertAdjacentHTML('beforeend', markUp(arrayImages));
}
