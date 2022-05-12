console.log('Labas albums')

// 9. Tokiu pačiu principu, kaip ir vartotojų puslapį, sukurti puslapį albumams (albums.html).
// 9.1. Prie kiekvieno albumo turi būti:
// 9.1.1. Parašytas jo pavadinimas.
// 9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
// 9.1.3. Albume esančių nuotraukų skaičius.
// 9.1.4. Viena nuotrauka

let urlParams = new URLSearchParams(document.location.search)
const USERID = urlParams.get('userId')
console.log(USERID)

function capitalizeFirstLetter(string) {
  return string.at(0).toUpperCase() + string.slice(1)
}

let pageWrapper = document.createElement('div')
pageWrapper.classList.add('pageWrapper')
document.body.prepend(pageWrapper)

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

let url = ``
if (USERID) {
  url = `https://jsonplaceholder.typicode.com/users/${USERID}/albums`
} else {
  url = `https://jsonplaceholder.typicode.com/albums`
}

fetch(url)
.then(res => res.json())
.then(albums => {
  let albumsWrapper = document.createElement('div')
  albumsWrapper.classList.add('albumsWrapper')
  pageWrapper.append(albumsWrapper)

  albums.map(album => {
    let albumId = album.id
    let albumTitle = album.title
    let userId = album.userId

    let oneAlbum = document.createElement('div')
    oneAlbum.classList.add('oneAlbum')
    albumsWrapper.append(oneAlbum)

    let albumTitleElement = document.createElement('h3')
    let albumAuthorElement = document.createElement('p')
    let albumPhotoElement = document.createElement('div')
    let albumTotalPhotosElement = document.createElement('p')
    oneAlbum.append(albumTitleElement, albumAuthorElement, albumPhotoElement, albumTotalPhotosElement)
    
    albumTitleElement.innerHTML = `<a href="./album.html?albumId=${albumId}">${capitalizeFirstLetter(albumTitle)}</a>`

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(author => {
      albumAuthorElement.innerHTML = `<span>Album author: </span>${author.name}`
    })
    
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then(res => res.json())
    .then(photos => {
      albumPhotoElement.innerHTML = `<img src="${photos[0].thumbnailUrl}" alt="">`
      albumTotalPhotosElement.textContent = `Total photos in album: ${photos.length}`
    })

  })
}).catch(error => {
  // pageWrapper.remove()
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Nėra tokio autoriaus!'
  document.body.append(errorMessage)
})