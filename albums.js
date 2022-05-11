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

let url = ``
if (USERID) {
  url = `https://jsonplaceholder.typicode.com/users/${USERID}/albums`
} else {
  url = `https://jsonplaceholder.typicode.com/albums`
}

// fetch(url)
// // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${USERID}`)
// // fetch(`https://jsonplaceholder.typicode.com/posts/${POSTID}`)
// // fetch(`https://jsonplaceholder.typicode.com/posts?_limit=25`)
// // fetch(`https://jsonplaceholder.typicode.com/posts`)
// .then(res => res.json())
// .then(posts => {
//   console.dir(posts)
//   if (posts.length === 0) return error
//   let postsWrapper = document.createElement('div')
//   postsWrapper.classList.add('postsWrapper')
//   pageWrapper.append(postsWrapper);

//   posts.map(post => {
//     let title = post.title
//     let body = `${capitalizeFirstLetter(post.body)}.`
//     let id = post.id
//     let userId = post.userId
//     let postElement = document.createElement('div')
//     postElement.classList.add('onePost')
//     postsWrapper.prepend(postElement)
//     let titleElement = document.createElement('h1')
//     // titleElement.textContent = title.toUpperCase();
//     titleElement.textContent = capitalizeFirstLetter(title)
//     let authorElement = document.createElement('div')
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     .then(res => res.json())
//     .then(author => {
//       // console.log(author.name)
//       authorElement.innerHTML = `<p><span>Author: </span><a href="./user.html?userId=${userId}">${author.name}</a>`
//     })
      
//     let bodyElement = document.createElement('p')
//     bodyElement.textContent = `${body} ${body} ${body} ${body}`

//     let commentsButton = document.createElement('input')
//     commentsButton.setAttribute('type', 'button')
//     commentsButton.setAttribute('value', 'Show comments')

//     let commentsElement = document.createElement('div')
//     commentsElement.classList.add('allComments')
//     // commentsElement.classList.add('allComments', 'hidden')
//     commentsElement.style.visibility = 'hidden';
//     commentsElement.style.opacity = '0';
//     commentsElement.style.height = '0';
//     postElement.append(titleElement, authorElement, bodyElement, commentsButton, commentsElement)
//     let commentsElementHeading = document.createElement('h2')
//     commentsElementHeading.textContent = 'Comments'
//     commentsElement.append(commentsElementHeading)

//     /////////////////////////////////////

//     commentsButton.addEventListener('click', event =>{
//       if (event.target.value === 'Show comments') {
//         event.target.value = 'Hide comments'
//       } else if (event.target.value === 'Hide comments') {
//         event.target.value = 'Show comments'
//       }
//       // commentsElement.classList.toggle('hidden')
//       // console.dir(commentsElement.clientHeight)
//       // console.dir(event.target.nextElementSibling.childNodes)
//       ///////////////////////////////////////////////////////// test
//       let height = 0;
//       event.target.nextElementSibling.childNodes.forEach(element => {
//         // console.dir(element.clientHeight)
//         height += element.clientHeight;
//       });
//       // console.log('height', height)

//       if (commentsElement.style.visibility === 'hidden') {
//         commentsElement.style.visibility = 'visible'
//         commentsElement.style.opacity = '1'
//         commentsElement.style.height = height + 40 + 32 + 'px' //40px heading marginas, 32px - 4 elementu marginas (8px*4) = reikia tobulinti, surišti su komentaru skaičiumi
//       }
//       else {
//         commentsElement.style.visibility = 'hidden'
//         commentsElement.style.opacity = '0'
//         commentsElement.style.height = '0'
//       }

//       // console.dir(commentsElement)
//       ///////////////////////
//     })

//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
//     .then(res => res.json())
//     .then(coments => {
//       coments.map(comment => {
//         let oneCommentElement = document.createElement('div')
//         oneCommentElement.classList.add('oneComment')
//         commentsElement.append(oneCommentElement)
//         let oneCommentElementTitle = document.createElement('h4')
//         let oneCommentElementBody = document.createElement('p')
//         let oneCommentElementEmail = document.createElement('p')
//         oneCommentElement.append(oneCommentElementTitle, oneCommentElementBody, oneCommentElementEmail)

//         oneCommentElementTitle.textContent = capitalizeFirstLetter(comment.name)
//         oneCommentElementBody.textContent = `"${capitalizeFirstLetter(comment.body)}."`
//         oneCommentElementEmail.innerHTML = `<span>Commented by:</span> ${comment.email}`
//         })
//       })
//     }) ///posts.map pabaiga

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
      // console.log(author.name)
      albumAuthorElement.innerHTML = `<span>Album author: </span>${author.name}`
    })
    
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then(res => res.json())
    .then(photos => {
      console.log(photos)
      albumPhotoElement.innerHTML = `<img src="${photos[0].thumbnailUrl}" alt="">`
      albumTotalPhotosElement.textContent = `Total photos in album: ${photos.length}`
      // albumPhotoElement.innerHTML = `<img src="${albums[0].url}" alt="">`
      // albumAuthorElement.textContent = author.name
      // console.log(albums[0])
    })

  })
}).catch(error => {
  // pageWrapper.remove()
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Nėra tokio autoriaus!'
  document.body.append(errorMessage)
})

// suskleidžiame komentarus(jei jie išskleisti), nes pakeitus lango dydį nebeatitinka komentarų divo aukštis
window.addEventListener('resize', hideComments)
function hideComments() {
  let buttons = document.querySelector('.postsWrapper').querySelectorAll('input[type=button]')
  buttons.forEach(button => {
    if (button.value === 'Hide comments') {
      button.value = 'Show comments'
      button.nextElementSibling.style.visibility = 'hidden'
      button.nextElementSibling.style.opacity = '0'
      button.nextElementSibling.style.height = '0'
    }
  })
}