let urlParams = new URLSearchParams(document.location.search);
const USERID = urlParams.get('userId')

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
})
// .catch(error => {
//   // userWrapper.remove();
//   let errorMessage = document.createElement('h1')
//   errorMessage.style.color = 'white'
//   errorMessage.textContent = 'Tokio vartotojo nėra!'
//   document.body.append(errorMessage)
// })
  


  
  
  