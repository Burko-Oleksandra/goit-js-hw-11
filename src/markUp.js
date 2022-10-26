export default function markUp(arrayImages) {
  console.log(arrayImages);
  const arrayGallery = arrayImages
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        //   console.log(image['userImageURL']);
        return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 250px height = 166px/>
    <div class="info">
    <p class="info-item">
    <b>Likes: <span>${likes}</span></b>
    </p>
    <p class="info-item">
    <b>Views: <span>${views}</span>
    </b></p>
    <p class="info-item">
    <b>Comments: <span>${comments}</span></b>
    </p>
    <p class="info-item">
    <b>Downloads: <span>${downloads}</span></b>
    </p>
    </div>
    </div>`;
      }
    )
    .join('');
  return arrayGallery;
}
