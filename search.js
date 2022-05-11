console.log('Labas search')

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

let urlParams = new URLSearchParams(document.location.search)
const SEARCH = urlParams.get('search')
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

navCenterElement.append(authorsLinkElement, postsLinkElement, albumsLinkElement)

// let searchDivElement = document.createElement('div')
// navRightElement.append(searchDivElement)

// searchDivElement.innerHTML = `<form id="searchForm" action="./search.html">
// <input type="text" name="search" id="search">
// <input type="submit" value="Search">
// </form>`
/// nav pabaiga

fetch(`https://jsonplaceholder.typicode.com/users?username=${SEARCH}`)
.then(res => res.json())
.then(usernames => {
  let resultsWrapper = document.createElement('div')
  resultsWrapper.classList.add('resultsWrapper')
  pageWrapper.append(resultsWrapper);

  // console.dir(posts)
  if (usernames.length === 0) {
    let oneResult = document.createElement('div')
    oneResult.classList.add('oneResult')
    oneResult.textContent = `Username: Nieko nerasta`
    resultsWrapper.append(oneResult)
    // console.log('Nieko nerasta')
  } else {
    usernames.map(username => {
      let oneResult = document.createElement('div')
      oneResult.classList.add('oneResult')
      oneResult.textContent = `Username rasta: id:${username.id} name:${username.name}`
      // console.log('rastas user id: ' + username.id)
      resultsWrapper.append(oneResult)
    })
  }

  fetch(`https://jsonplaceholder.typicode.com/users?name=${SEARCH}`)
  .then(res => res.json())
  .then(names => {
     
    // console.dir(posts)
    if (names.length === 0) {
      let oneResult = document.createElement('div')
      oneResult.classList.add('oneResult')
      oneResult.textContent = `Name: Nieko nerasta`
      resultsWrapper.append(oneResult)
      // console.log('Nieko nerasta')
    } else {
      names.map(name => {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.textContent = `Name rasta: id:${name.id} name:${name.name}`
        // console.log('rastas user id: ' + username.id)
        resultsWrapper.append(oneResult)
      })
    }
    
    fetch(`https://jsonplaceholder.typicode.com/users?email=${SEARCH}`)
    .then(res => res.json())
    .then(emails => {
       
      // console.dir(posts)
      if (emails.length === 0) {
        let oneResult = document.createElement('div')
        oneResult.classList.add('oneResult')
        oneResult.textContent = `Email: Nieko nerasta`
        resultsWrapper.append(oneResult)
        // console.log('Nieko nerasta')
      } else {
        emails.map(email => {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.textContent = `Email rasta: id:${email.id} email:${email.email}`
          // console.log('rastas user id: ' + username.id)
          resultsWrapper.append(oneResult)
        })
      }
    
      fetch(`https://jsonplaceholder.typicode.com/posts?title=${SEARCH}`)
      .then(res => res.json())
      .then(posts => {
         
        // console.dir(posts)
        if (posts.length === 0) {
          let oneResult = document.createElement('div')
          oneResult.classList.add('oneResult')
          oneResult.textContent = `Post: Nieko nerasta`
          resultsWrapper.append(oneResult)
          // console.log('Nieko nerasta')
        } else {
          posts.map(post => {
            let oneResult = document.createElement('div')
            oneResult.classList.add('oneResult')
            oneResult.textContent = `Post rasta: id:${post.id} title:${post.title}`
            // console.log('rastas user id: ' + username.id)
            resultsWrapper.append(oneResult)
          })
        }
        
        fetch(`https://jsonplaceholder.typicode.com/albums?title=${SEARCH}`)
        .then(res => res.json())
        .then(albums => {
           
          // console.dir(posts)
          if (albums.length === 0) {
            let oneResult = document.createElement('div')
            oneResult.classList.add('oneResult')
            oneResult.textContent = `Album: Nieko nerasta`
            resultsWrapper.append(oneResult)
            // console.log('Nieko nerasta')
          } else {
            albums.map(album => {
              let oneResult = document.createElement('div')
              oneResult.classList.add('oneResult')
              oneResult.textContent = `Album rasta: id:${album.id} title:${album.title}`
              // console.log('rastas user id: ' + username.id)
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

// suskleidžiame komentarus(jei jie išskleisti), nes pakeitus lango dydį nebeatitinka komentarų divo aukštis
// window.addEventListener('resize', hideComments)
// function hideComments() {
//   let buttons = document.querySelector('.postsWrapper').querySelectorAll('input[type=button]')
//   buttons.forEach(button => {
//     if (button.value === 'Hide comments') {
//       button.value = 'Show comments'
//       button.nextElementSibling.style.visibility = 'hidden'
//       button.nextElementSibling.style.opacity = '0'
//       button.nextElementSibling.style.height = '0'
//     }
//   })
// }