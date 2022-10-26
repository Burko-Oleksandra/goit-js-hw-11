export default function markUp(arrayImages) {
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
    <b><ion-icon name="heart-outline"></ion-icon><span>${likes}</span></b>
    </p>
    <p class="info-item">
    <b><ion-icon name="eye-outline"></ion-icon><span>${views}</span>
    </b></p>
    <p class="info-item">
    <b><ion-icon name="chatbox-outline"></ion-icon><span>${comments}</span></b>
    </p>
    <p class="info-item">
    <b><ion-icon name="cloud-download-outline"></ion-icon><span>${downloads}</span></b>
    </p>
    </div>
    </div>`;
      }
    )
    .join('');
  return arrayGallery;
}
