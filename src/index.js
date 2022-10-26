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

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchEl = document.querySelector('.search-btn');
const loadMoreEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
const imageApi = new ImageApi();

let currentHits = 0;

formEl.addEventListener('submit', onSearch);
loadMoreEl.addEventListener('click', loadMore);

async function onSearch(e) {
  e.preventDefault();
  waitForLoading();
  loadMoreEl.classList.add('visually-hidden');
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
          background: 'rgba(249, 172, 103, 1)',
          textColor: 'rgba(58, 63, 88, 1)',
          notiflixIconColor: 'rgba(58, 63, 88, 1)',
        },
      }
    );
    return;
  }

  imageApi.resetPage();
  await imageApi.fetchImage().then(hits => {
    currentHits += hits.length;
    drawMarkup(hits);
  });
  loadMoreEl.classList.remove('visually-hidden');
  Notiflix.Loading.remove();
}

async function loadMore() {
  waitForLoading();
  await imageApi.fetchImage().then(hits => {
    currentHits += hits.length;
    drawMarkupMore(hits);
    if (currentHits >= imageApi.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results",
        {
          timeout: 3000,
          cssAnimationStyle: 'zoom',
          info: {
            background: 'rgba(249, 172, 103, 1)',
            textColor: 'rgba(58, 63, 88, 1)',
            notiflixIconColor: 'rgba(58, 63, 88, 1)',
          },
        }
      );
      loadMoreEl.classList.add('visually-hidden');
    }
  });
  Notiflix.Loading.remove();
}

function drawMarkup(arrayImages) {
  galleryEl.innerHTML = markUp(arrayImages);
}

function drawMarkupMore(arrayImages) {
  galleryEl.insertAdjacentHTML('beforeend', markUp(arrayImages));
}

function waitForLoading() {
  Notiflix.Loading.dots({
    backgroundColor: 'rgba(0,0,0,0.3)',
    svgColor: '#ee6a59',
    svgSize: '50px',
    messageFontSize: '18px',
  });
}
