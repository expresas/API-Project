console.log('Labas user')

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
let urlParams = new URLSearchParams(document.location.search);
const USERID = urlParams.get('userId')
// console.log(USERID)

function capitalizeFirstLetter(string) {
  return string.at(0).toUpperCase() + string.slice(1)
}

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

fetch(`https://jsonplaceholder.typicode.com/users/${USERID}`)
.then(res => res.json())
.then(author => {
  let userWrapper = document.createElement('div');
  userWrapper.classList.add('userWrapper')
  
  let userInfoElement = document.createElement('div')
  userInfoElement.classList.add('userInfo')
  
  let nameElement = document.createElement('h1')
  let usernameElement = document.createElement('div')
  let emailElement = document.createElement('div')
  let addressElement = document.createElement('div')
  let phoneElement = document.createElement('div')
  let websiteElement = document.createElement('div')
  let companyElement = document.createElement('div')
  
  nameElement.innerHTML = `${author.name}`
  usernameElement.innerHTML = `<span>Username: </span>${author.username}`
  emailElement.innerHTML = `<span>Email: </span> <a href="mailto:${author.email}">${author.email}</a>`
  addressElement.innerHTML = `<span>Address: </span> <a href="http://www.google.com/maps/place/${author.address.geo.lat},${author.address.geo.lng}" target="_blank">${author.address.street} ${author.address.suite}, ${author.address.city} ${author.address.zipcode}</a>`
  phoneElement.innerHTML = `<span>Phone: </span> <a href="tel:${author.phone}">${author.phone}</a>`
  websiteElement.innerHTML = `<span>Website: </span> <a href="http://www.${author.website}" target="_blank">${author.website}</a>`
  companyElement.innerHTML = `<span>Works in company: </span>${author.company.name}`
  
  document.body.append(userWrapper)
  userWrapper.append(userInfoElement)
  userInfoElement.append(nameElement, usernameElement, emailElement, addressElement, phoneElement, websiteElement, companyElement)
  // console.log(author)
    
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${USERID}`)
  .then(res => res.json())
  .then(posts => {
    let userPostsElement = document.createElement('div')
    userPostsElement.classList.add('postsInfo')
    userWrapper.append(userPostsElement);
    let userPostsElementHeading = document.createElement('h2')
    userPostsElementHeading.textContent = `Posts`
    userPostsElement.append(userPostsElementHeading)

    posts.map(post => {
      let userPostElement = document.createElement('div')
      userPostElement.classList.add('onePost')
      userPostsElement.append(userPostElement)
  
      let userPostTitle = document.createElement('h4')
      // let userPostBody = document.createElement('p')
      // userPostElement.append(userPostTitle, userPostBody)
      userPostElement.append(userPostTitle)
      userPostTitle.innerHTML = `<a href="./post.html?postId=${post.id}">${capitalizeFirstLetter(post.title)}</a>`
      // userPostBody.textContent = capitalizeFirstLetter(post.body)
      // console.log('postas', post)
    })

    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${USERID}`)
    .then(res => res.json())
    .then(albums => {
      let userAlbumsElement = document.createElement('div')
      userAlbumsElement.classList.add('albumsInfo')
      userWrapper.append(userAlbumsElement);
      let userAlbumsElementHeading = document.createElement('h2')
      userAlbumsElementHeading.textContent = `Albums`
      userAlbumsElement.append(userAlbumsElementHeading)
  
      albums.map(album => {
        let userAlbumElement = document.createElement('div')
        userAlbumElement.classList.add('onePost')
        userAlbumsElement.append(userAlbumElement);
    
        let userAlbumTitle = document.createElement('h4')
        userAlbumElement.append(userAlbumTitle)
        userAlbumTitle.innerHTML = `<a href="./album.html?albumId=${album.id}">${capitalizeFirstLetter(album.title)}</a>`
        // console.log(album)
      })
    })
  })
}).catch(error => {
  // userWrapper.remove();
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Tokio vartotojo nėra!'
  document.body.append(errorMessage)
})
  


  
  
  