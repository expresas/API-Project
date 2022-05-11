console.log('Labas users')

// 8. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
// 8.1. Prie vartotojo turėtu būti jo vardas ir parašytų post'ų skaičius.
// 8.2. Paspaudus ant vartotojo - nukreipiama į jo puslapį.

let urlParams = new URLSearchParams(document.location.search);
const USERID = urlParams.get('userId')
// console.log(USERID)

function capitalizeFirstLetter(string) {
  return string.at(0).toUpperCase() + string.slice(1)
}

// navigacija
let navWrapper = document.createElement('div')
navWrapper.classList.add('navWrapper')
document.body.prepend(navWrapper)

let navLeftElement = document.createElement('div')
navLeftElement.classList.add('navLeft')
let navRightElement = document.createElement('div')
navRightElement.classList.add('navRight')
navWrapper.append(navLeftElement, navRightElement)
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

navRightElement.append(authorsLinkElement, postsLinkElement, albumsLinkElement)
/// nav pabaiga

fetch(`https://jsonplaceholder.typicode.com/users`)
.then(res => res.json())
.then(authors => {
  console.log(authors)
  let userWrapper = document.createElement('div');
  userWrapper.classList.add('userWrapper')
  
  
  document.body.append(userWrapper)
  
  authors.map(author => {
    let userInfoElement = document.createElement('div')
    userInfoElement.classList.add('userInfo')
    userWrapper.append(userInfoElement)
    let nameElement = document.createElement('h2')
    let postsCountElement = document.createElement('div')
    
    nameElement.innerHTML = `<a href="./user.html?userId=${author.id}">${author.name}</a>`

    fetch(`https://jsonplaceholder.typicode.com/users/${author.id}/posts`)
    .then(res => res.json())
    .then(posts => {
      postsCountElement.innerHTML = `Total count of posts: ${posts.length}`
    })
 
    userInfoElement.append(nameElement, postsCountElement)
  })
  
  
  // console.log(author)
    
  // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${USERID}`)
  // .then(res => res.json())
  // .then(posts => {
  //   let userPostsElement = document.createElement('div')
  //   userPostsElement.classList.add('postsInfo')
  //   userWrapper.append(userPostsElement);
  //   let userPostsElementHeading = document.createElement('h2')
  //   userPostsElementHeading.textContent = `Posts`
  //   userPostsElement.append(userPostsElementHeading)

  //   posts.map(post => {
  //     let userPostElement = document.createElement('div')
  //     userPostElement.classList.add('onePost')
  //     userPostsElement.append(userPostElement)
  
  //     let userPostTitle = document.createElement('h4')
  //     // let userPostBody = document.createElement('p')
  //     // userPostElement.append(userPostTitle, userPostBody)
  //     userPostElement.append(userPostTitle)
  //     userPostTitle.innerHTML = `<a href="./post.html?postId=${post.id}">${capitalizeFirstLetter(post.title)}</a>`
  //     // userPostBody.textContent = capitalizeFirstLetter(post.body)
  //     // console.log('postas', post)
  //   })

    // fetch(`https://jsonplaceholder.typicode.com/albums?userId=${USERID}`)
    // .then(res => res.json())
    // .then(albums => {
    //   let userAlbumsElement = document.createElement('div')
    //   userAlbumsElement.classList.add('albumsInfo')
    //   userWrapper.append(userAlbumsElement);
    //   let userAlbumsElementHeading = document.createElement('h2')
    //   userAlbumsElementHeading.textContent = `Albums`
    //   userAlbumsElement.append(userAlbumsElementHeading)
  
    //   albums.map(album => {
    //     let userAlbumElement = document.createElement('div')
    //     userAlbumElement.classList.add('onePost')
    //     userAlbumsElement.append(userAlbumElement);
    
    //     let userAlbumTitle = document.createElement('h4')
    //     userAlbumElement.append(userAlbumTitle)
    //     userAlbumTitle.innerHTML = `<a href="./album.html?albumId=${album.id}">${capitalizeFirstLetter(album.title)}</a>`
    //     // console.log(album)
    //   })
    // })
  // })
})
// .catch(error => {
//   // userWrapper.remove();
//   let errorMessage = document.createElement('h1')
//   errorMessage.style.color = 'white'
//   errorMessage.textContent = 'Tokio vartotojo nėra!'
//   document.body.append(errorMessage)
// })
  


  
  
  