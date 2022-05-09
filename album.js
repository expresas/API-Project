console.log('Labas')

// 6. Sukurti naują puslapį album.html ir jame atvaizduoti:
// 6.1. Albumo pavadinimą.
// 6.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
// 6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos. Panaudoti library (biblioteką), kuri skirta gražiam galerijos atvaizdavimui, pvz.:
// 6.3.1. https://photoswipe.com/
// 6.3.2. https://nanogallery2.nanostudio.org/
// 6.3.3. https://sachinchoolur.github.io/lightgallery.js/
// 6.3.4. Arba bet kurią kitą.

///////////////////////////

let urlParams = new URLSearchParams(document.location.search);
const ALBUMID = urlParams.get('albumId')
// document.location.search = '';
// history.replaceState({}, null, "/album.html");

// console.log(ALBUMID)

function capitalizeFirstLetter(string) {
  return string.at(0).toUpperCase() + string.slice(1)
}

let albumWrapper = document.createElement('div');
albumWrapper.classList.add('albumWrapper')

let albumInfoElement = document.createElement('div')
albumInfoElement.classList.add('albumInfo')

let albumNameElement = document.createElement('h1')
let albumAuthorElement = document.createElement('p')
let albumGalleryElement = document.createElement('div')
albumGalleryElement.classList.add('pswp-gallery')
albumGalleryElement.setAttribute('id', 'gallery--with-custom-caption')
// albumGalleryElement.setAttribute('id', 'my-gallery')
document.body.prepend(albumWrapper);
albumWrapper.append(albumInfoElement);
albumInfoElement.append(albumNameElement, albumAuthorElement, albumGalleryElement)

fetch(`https://jsonplaceholder.typicode.com/albums/${ALBUMID}`)
.then(res => res.json())
.then(album => {  
  albumNameElement.textContent = capitalizeFirstLetter(album.title)  
    
  fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
  .then(res => res.json())
  .then(author => {
    albumAuthorElement.innerHTML = `Author: <a href="./user.html?userId=${album.userId}">${author.name}</a>`
    
    fetch(`https://jsonplaceholder.typicode.com/albums/${ALBUMID}/photos`)
    .then(res => res.json())
    .then(photos => {
      photos.map(photo => {
        albumGalleryElement.innerHTML += `<a class="pswp-gallery__item" href="${photo.url}" data-pswp-width="600" data-pswp-height="600" target="_blank"><img src="${photo.thumbnailUrl}" alt="Title: ${capitalizeFirstLetter(photo.title)}" style="border-radius:1rem;"/></a>`
        // console.log(photo)
      })
      // console.log(photos)
    })
  })
}).catch(error => {
  albumWrapper.remove()
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Tokio albumo nėra!'
  document.body.append(errorMessage)
})

