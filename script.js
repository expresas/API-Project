console.log('Labas')

// https://jsonplaceholder.typicode.com/posts?_limit=3&_start=4
// https://jsonplaceholder.typicode.com/
// posts/10/comments
// pavadinimas - post title
// pastraipa - post body

// 1. Sukurti puslapį, kuriame bus atvaizduojami įrašai (posts). Kiekvienas įrašas turi:
// 1.1. Pavadinimą.
// 1.2. Pastraipą su įrašo (post) turiniu.
// 1.3. Autorių. Tai turi būti nuoroda. Kol kas ji gali niekur nevesti.
// 2. Po kiekvienu įrašu (post) gali būti komentarų (sukurti variantus įrašui, kuris neturi komentarų, kuris turi vieną komentarą ir kuris turi daugiau nei vieną komentarą). Kiekvienas komentaras turi:
// 2.1. Komentaro pavadinimą.
// 2.2. Komentaro turinį - pastraipą.
// 2.3. Komentarą parašiusio asmens el. pašto adresą.

// 3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
// 3.1. Pilnas vardas.
// 3.2. Vartotojo vardas / nick'as.
// 3.3. El. paštas.
// 3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps. Kol kas naudoti bet kokią Google Map vietovę.
// 3.5. Telefono numeris.
// 3.6. Internetinio puslapio adresas.
// 3.7. Įmonės, kurioje dirba, pavadinimas.

// 4. Šiame puslapyje turės būti atvaizduojama:
// 4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
// 4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
// 4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.

// 5. Pagrindiniame puslapyje (index.html) pridėti skiltį, kurioje atvaizduojamas albumų sąrašas. Kiekvienas albumas turės:
// 5.1. Pavadinimą, o paspaudus ant jo - nukreipiama į albumą (album.html).
// 5.2. Albumo autoriaus vardą.
// 5.3. Nuotrauką.

// 6. Sukurti naują puslapį album.html ir jame atvaizduoti:
// 6.1. Albumo pavadinimą.
// 6.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
// 6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos. Panaudoti library (biblioteką), kuri skirta gražiam galerijos atvaizdavimui, pvz.:
// 6.3.1. https://photoswipe.com/
// 6.3.2. https://nanogallery2.nanostudio.org/
// 6.3.3. https://sachinchoolur.github.io/lightgallery.js/
// 6.3.4. Arba bet kurią kitą.

// 7. Sukurti naują puslapį post.html ir jame atvaizduoti:
// 7.1. Įrašo (post) pavadinimą.
// 7.2. Autoriaus vardą. Paspaudus ant autoriaus vardo, turėtų atidaryti autoriaus puslapį.
// 7.3. Įrašo turinį.
// 7.4. Įrašo komentarus. Komentarai turi būti atvaizduojami tokiu pačiu principu kaip ir pagrindiniame puslapyje.
// 7.5. Nuoroda „Kiti autoriaus įrašai", kurią paspaudus bus nukreipiama į naują puslapį. Jame bus atvaizduojami visi šio vartotojo įrašai.

// 8. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
// 8.1. Prie vartotojo turėtu būti jo vardas ir parašytų post'ų skaičius.
// 8.2. Paspaudus ant vartotojo - nukreipiama į jo puslapį.

// 9. Tokiu pačiu principu, kaip ir vartotojų puslapį, sukurti puslapį albumams (albums.html).
// 9.1. Prie kiekvieno albumo turi būti:
// 9.1.1. Parašytas jo pavadinimas.
// 9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
// 9.1.3. Albume esančių nuotraukų skaičius.
// 9.1.4. Viena nuotrauka

// 10. Sukurti navigacijos elementą, kuris nukreips į puslapius:
// 10.1. Home / pagrindinis puslapis.
// 10.2. Users / vartotojų puslapis.
// 10.3. Albums / albumų puslapis

// 11. Navigacijos elemente sukurti paieškos laukelį (formą ir text input).
// 12. Formos submit metu, nukreipti į naują puslapį (search.html).
// 13. Šiame puslapyje atvaizduoti paieškos rezultatą.
// 13.1. Jeigu nėra tinkamų rezultatų, tai parašyti, jog rezultatų pagal užklausą nerasta.
// 14. Filtruoti pagal:
// 14.1. Tikslų vartotojo username.
// 14.2. Jeigu neranda pagal username, tada pagal tikslų vartotojo pilną vardą.
// 14.3. Jeigu neranda pagal username arba pagal tikslu vartotojo pilna vardą, tada pagal tikslų vartotojo el. paštą.
// 14.4. Tikslų post'o pavadinimą.
// 14.5. Tikslų albumo pavadinimą.

// Papildoma:
// 15. Search puslapyje turi būti paieškos forma, kuri veikia neperkraunant puslapio.
// 16. Sukurti filtravimo galimybę iš dalies frazės, o nebūtinai pagal tikslią frazę.

function capitalizeFirstLetter(string) {
  return string.at(0).toUpperCase() + string.slice(1)
}

let pageWrapper = document.createElement('div')
pageWrapper.classList.add('pageWrapper')
document.body.prepend(pageWrapper)

// navigacija
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
/// nav pabaiga

fetch(`https://jsonplaceholder.typicode.com/posts?_limit=25`)
// fetch(`https://jsonplaceholder.typicode.com/posts`)
.then(res => res.json())
.then(posts => {
  let postsWrapper = document.createElement('div')
  postsWrapper.classList.add('postsWrapper')
  pageWrapper.append(postsWrapper);

  posts.map(post => {
    let title = post.title
    let body = capitalizeFirstLetter(post.body)
    let id = post.id
    let userId = post.userId
    let postElement = document.createElement('div')
    postElement.classList.add('onePost')
    postsWrapper.prepend(postElement)
    let titleElement = document.createElement('h1')
    // titleElement.textContent = title.toUpperCase();
    titleElement.textContent = capitalizeFirstLetter(title)
    let authorElement = document.createElement('div')
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(author => {
      // console.log(author.name)
      authorElement.innerHTML = `<p><span>Author: </span><a href="./user.html?userId=${userId}">${author.name}</a></p>`
    })
      
    let bodyElement = document.createElement('p')
    bodyElement.textContent = `${body}.`

    let commentsButton = document.createElement('input')
    commentsButton.setAttribute('type', 'button')
    commentsButton.setAttribute('value', 'Show comments')
    

    let commentsElement = document.createElement('div')
    commentsElement.classList.add('allComments')
    // commentsElement.classList.add('allComments', 'hidden')
    commentsElement.style.visibility = 'hidden';
    commentsElement.style.opacity = '0';
    commentsElement.style.height = '0';
    postElement.append(titleElement, authorElement, bodyElement, commentsButton, commentsElement)
    let commentsElementHeading = document.createElement('h2')
    commentsElementHeading.textContent = 'Comments'
    commentsElement.append(commentsElementHeading)

    /////////////////////////////////////

    commentsButton.addEventListener('click', event =>{
      if (event.target.value === 'Show comments') {
        event.target.value = 'Hide comments'
      } else if (event.target.value === 'Hide comments') {
        event.target.value = 'Show comments'
      }
      // commentsElement.classList.toggle('hidden')
      // console.dir(commentsElement.clientHeight)
      // console.dir(event.target.nextElementSibling.childNodes)
      ///////////////////////////////////////////////////////// test
      let height = 0;
      event.target.nextElementSibling.childNodes.forEach(element => {
        // console.dir(element.clientHeight)
        height += element.clientHeight;
      });
      // console.log('height', height)

      if (commentsElement.style.visibility === 'hidden') {
        commentsElement.style.visibility = 'visible'
        commentsElement.style.opacity = '1'
        commentsElement.style.height = height + 40 + 32 + 'px' //40px heading marginas, 32px - 4 elementu marginas (8px*4) = reikia tobulinti, surišti su komentaru skaičiumi
      }
      else {
        commentsElement.style.visibility = 'hidden'
        commentsElement.style.opacity = '0'
        commentsElement.style.height = '0'
      }

      // console.dir(commentsElement)
      ///////////////////////
    })

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(res => res.json())
    .then(coments => {
      coments.map(comment => {
        let oneCommentElement = document.createElement('div')
        oneCommentElement.classList.add('oneComment')
        commentsElement.append(oneCommentElement)
        let oneCommentElementTitle = document.createElement('h4')
        let oneCommentElementBody = document.createElement('p')
        let oneCommentElementEmail = document.createElement('p')
        oneCommentElement.append(oneCommentElementTitle, oneCommentElementBody, oneCommentElementEmail)

        oneCommentElementTitle.textContent = capitalizeFirstLetter(comment.name)
        oneCommentElementBody.textContent = `"${capitalizeFirstLetter(comment.body)}."`
        oneCommentElementEmail.innerHTML = `<span>Commented by:</span> ${comment.email}`
        })
      })
    }) ///posts.map pabaiga
      
    fetch(`https://jsonplaceholder.typicode.com/albums?_limit=20`)
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
        oneAlbum.append(albumTitleElement, albumAuthorElement, albumPhotoElement)
        
        albumTitleElement.innerHTML = `<a href="./album.html?albumId=${albumId}">${capitalizeFirstLetter(albumTitle)}</a>`
    
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(author => {
          // console.log(author.name)
          albumAuthorElement.innerHTML = `<span>Album author: </span>${author.name}`
        })
        
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(res => res.json())
        .then(albums => {
          // console.log(albums[0].thumbnailUrl)
          albumPhotoElement.innerHTML = `<img src="${albums[0].thumbnailUrl}" alt="">`
          // albumPhotoElement.innerHTML = `<img src="${albums[0].url}" alt="">`
          // albumAuthorElement.textContent = author.name
          // console.log(albums[0])
        })
    
      })
    })
}).catch(error => {
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Klaida!'
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
  




