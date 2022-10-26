const MY_KEY = '30847710-2a74f0266730d3c25fa6c5c5e';
const URL = 'https://pixabay.com/api/';

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    return fetch(
      `${URL}?key=${MY_KEY}&safesearch=true&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=5&page=${this.page}`
    )
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
