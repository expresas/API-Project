let urlParams = new URLSearchParams(document.location.search)
let SEARCH = urlParams.get('search').trim().toLowerCase()

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

navRightElement.append(authorsLinkElement, postsLinkElement, albumsLinkElement)
/// nav pabaiga

let searchDivElement = document.createElement('div')
searchDivElement.classList.add('oneResult')
pageWrapper.append(searchDivElement)

searchDivElement.innerHTML = `<form id="searchForm">
<label for="search">Search phrase: </label>
<input type="text" name="search" id="search" required>
<input type="submit" value="Search">
</form>`

let searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', event => {
  event.preventDefault()
  SEARCH = event.target.elements.search.value.trim().toLowerCase()
  if (document.querySelector('.resultsWrapper')){
    document.querySelector('.resultsWrapper').remove()
  }
  showSearchResults()
})

function showSearchResults() {
  let resultsWrapper = document.createElement('div')
  resultsWrapper.classList.add('resultsWrapper')
  pageWrapper.append(resultsWrapper)

  fetch(`https://jsonplaceholder.typicode.com/users`)
  .then(res => res.json())
  .then(users => {
    let userFound = false;
    
    users.map(user => {
      let name = user.name.toLowerCase()
      let userName = user.username.toLowerCase()
      let emailas = user.email.toLowerCase()

      if (name.includes(SEARCH) || userName.includes(SEARCH) || emailas.includes(SEARCH)) {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.innerHTML = `Author found: <span><a href="./user.html?userId=${user.id}">${user.name}</a></span>, <span>${user.username}</span>, <span>${user.email}</span>`
        resultsWrapper.append(oneResult)
        userFound = true
      } 
    })

    if (!userFound) {
      let oneResult = document.createElement('div')
      oneResult.classList.add('oneResult')
      oneResult.innerHTML = `Authors: no results for phrase <span>${SEARCH}</span>`
      resultsWrapper.append(oneResult)
    }
    
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(res => res.json())
    .then(posts => {
      let postFound = false;
      
      posts.map(post => {
        let postTitle = post.title.toLowerCase()
  
        if (postTitle.includes(SEARCH)) {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.innerHTML = `Post found: <span><a href="./post.html?postId=${post.id}">${capitalizeFirstLetter(post.title)}</a></span>`
          resultsWrapper.append(oneResult)
          postFound = true
        } 
      })
  
      if (!postFound) {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.innerHTML = `Posts: no results for phrase <span>${SEARCH}</span>`
        resultsWrapper.append(oneResult)
      }
      
      fetch(`https://jsonplaceholder.typicode.com/albums`)
      .then(res => res.json())
      .then(albums => {
        let albumFound = false;
        
        albums.map(album => {
          let albumTitle = album.title.toLowerCase()
    
          if (albumTitle.includes(SEARCH)) {
            let oneResult = document.createElement('div')
            oneResult.classList.add('oneResult')
            oneResult.innerHTML = `Album found: <span><a href="./album.html?albumId=${album.id}">${capitalizeFirstLetter(album.title)}</a></span>`
            resultsWrapper.append(oneResult)
            albumFound = true
          } 
        })
    
        if (!albumFound) {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.innerHTML = `Albums: no results for phrase <span>${SEARCH}</span>`
          resultsWrapper.append(oneResult)
        }
      })
    })
  })
}

if (SEARCH) {
  showSearchResults()
}