let urlParams = new URLSearchParams(document.location.search)
const ALBUMID = urlParams.get('albumId')

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
document.body.prepend(albumWrapper);
albumWrapper.append(albumInfoElement);
albumInfoElement.append(albumNameElement, albumAuthorElement, albumGalleryElement)

// navigation start
let navWrapper = document.createElement('div')
navWrapper.classList.add('navWrapper')
document.body.prepend(navWrapper)

let navLeftElement = document.createElement('div')
navLeftElement.classList.add('navLeft')
let navCenterElement = document.createElement('div')
navCenterElement.classList.add('navCenter')
let navRightElement = document.createElement('div')
navRightElement.classList.add('navRight')

navWrapper.append(navLeftElement, navCenterElement, navRightElement)
let homeLinkElement = document.createElement('a')
homeLinkElement.textContent = 'Home'
homeLinkElement.href = './'
navLeftElement.append(homeLinkElement)

let authorsLinkElement = document.createElement('a')
authorsLinkElement.textContent = 'Authors'
authorsLinkElement.href = './users.html'
let postsLinkElement = document.createElement('a')
postsLinkElement.textContent = 'Posts'
postsLinkElement.href = './posts.html'
let albumsLinkElement = document.createElement('a')
albumsLinkElement.textContent = 'Albums'
albumsLinkElement.href = './albums.html'

navCenterElement.append(authorsLinkElement, postsLinkElement, albumsLinkElement)

let searchDivElement = document.createElement('div')
navRightElement.append(searchDivElement)

searchDivElement.innerHTML = `<form id="searchForm" action="./search.html">
<input type="text" name="search" id="search" required>
<input type="submit" value="Search">
</form>`
// navigation end

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
      })
    })
  })
}).catch(error => {
  albumWrapper.remove()
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Tokio albumo nėra!'
  document.body.append(errorMessage)
})

