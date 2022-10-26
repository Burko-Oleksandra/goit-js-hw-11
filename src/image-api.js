import axios from 'axios';

const MY_KEY = '30847710-2a74f0266730d3c25fa6c5c5e';
const URL = 'https://pixabay.com/api/';

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchImage() {
    return await axios
      .get(
        `${URL}?key=${MY_KEY}&safesearch=true&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=200&page=${this.page}`
      )
      .then(data => {
        this.page += 1;
        this.totalHits = data.data.totalHits;
        return data.data.hits;
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
