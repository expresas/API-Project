console.log('Labas search')

// Papildoma:
// 15. Search puslapyje turi būti paieškos forma, kuri veikia neperkraunant puslapio.
// 16. Sukurti filtravimo galimybę iš dalies frazės, o nebūtinai pagal tikslią frazę.

let urlParams = new URLSearchParams(document.location.search)
let SEARCH = urlParams.get('search')
console.log(SEARCH)

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

// let searchDivElement = document.createElement('div')
// navRightElement.append(searchDivElement)

// searchDivElement.innerHTML = `<form id="searchForm" action="./search.html">
// <input type="text" name="search" id="search">
// <input type="submit" value="Search">
// </form>`
/// nav pabaiga

let searchDivElement = document.createElement('div')
searchDivElement.classList.add('oneResult')
pageWrapper.append(searchDivElement)

searchDivElement.innerHTML = `<form id="searchForm">
<label for="search">Search phrase: </label>
<input type="text" name="search" id="search" required>
<input type="submit" value="Search">&nbsp;&nbsp;
<label>(e.g. "Bret", "Leanne Graham", "Sincere@april.biz", "qui est esse" ...)</label>
</form>`

let searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', event => {
  event.preventDefault()
  // console.dir(event.target.elements.search.value)
  SEARCH = event.target.elements.search.value
  if (document.querySelector('.resultsWrapper')){
    document.querySelector('.resultsWrapper').remove()
  }
  showSearchResults(SEARCH)
})

function showSearchResults(text) {
  fetch(`https://jsonplaceholder.typicode.com/users?username=${SEARCH}`)
  .then(res => res.json())
  .then(usernames => {
    let resultsWrapper = document.createElement('div')
    resultsWrapper.classList.add('resultsWrapper')
    pageWrapper.append(resultsWrapper)
  
    if (usernames.length === 0) {
      let oneResult = document.createElement('div')
      oneResult.classList.add('oneResult')
      oneResult.textContent = `Username: no results for phrase "${SEARCH}"`
      resultsWrapper.append(oneResult)
    } else {
      usernames.map(username => {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.innerHTML = `Username found: <span>${SEARCH}</span>, real name: <span>${username.name}</span>`
        resultsWrapper.append(oneResult)
      })
    }
  
    fetch(`https://jsonplaceholder.typicode.com/users?name=${SEARCH}`)
    .then(res => res.json())
    .then(names => {
       
      if (names.length === 0) {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.textContent = `Name: no results for phrase "${SEARCH}"`
        resultsWrapper.append(oneResult)
      } else {
        names.map(name => {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.innerHTML = `Name found: <span>${SEARCH}</span>, authors username is: <span>${name.username}</span>`
          resultsWrapper.append(oneResult)
        })
      }
      
      fetch(`https://jsonplaceholder.typicode.com/users?email=${SEARCH}`)
      .then(res => res.json())
      .then(emails => {
         
        if (emails.length === 0) {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.textContent = `Email: no results for phrase "${SEARCH}"`
          resultsWrapper.append(oneResult)
        } else {
          emails.map(email => {
            let oneResult = document.createElement('div')
            oneResult.classList.add('oneResult')
            oneResult.innerHTML = `Email found: <span>${SEARCH}</span>, authors name is: <span>${email.name}</span>`
            resultsWrapper.append(oneResult)
          })
        }
      
        fetch(`https://jsonplaceholder.typicode.com/posts?title=${SEARCH}`)
        .then(res => res.json())
        .then(posts => {
           
          if (posts.length === 0) {
            let oneResult = document.createElement('div')
            oneResult.classList.add('oneResult')
            oneResult.textContent = `Post title: no results for phrase "${SEARCH}"`
            resultsWrapper.append(oneResult)
          } else {
            posts.map(post => {
              let oneResult = document.createElement('div')
              oneResult.classList.add('oneResult')
              oneResult.innerHTML = `Post title found: <span>${capitalizeFirstLetter(SEARCH)}</span>, post: <span>" ${capitalizeFirstLetter(post.body)}"</span>.`
              resultsWrapper.append(oneResult)
            })
          }
          
          fetch(`https://jsonplaceholder.typicode.com/albums?title=${SEARCH}`)
          .then(res => res.json())
          .then(albums => {
             
            if (albums.length === 0) {
              let oneResult = document.createElement('div')
              oneResult.classList.add('oneResult')
              oneResult.textContent = `Album title: no results for phrase "${SEARCH}"`
              resultsWrapper.append(oneResult)
            } else {
              albums.map(album => {
                let oneResult = document.createElement('div')
                oneResult.classList.add('oneResult')
                oneResult.innerHTML = `Album title found: <span>${capitalizeFirstLetter(SEARCH)}</span>`
                resultsWrapper.append(oneResult)
              })
            }
          })
      })
      })
    })
  })
  // .catch(error => {
  //   // pageWrapper.remove()
  //   let errorMessage = document.createElement('h1')
  //   errorMessage.style.color = 'white'
  //   errorMessage.textContent = 'Nėra tokio autoriaus!'
  //   document.body.append(errorMessage)
  // })
}

if (SEARCH) {
  showSearchResults(SEARCH)
}