let urlParams = new URLSearchParams(document.location.search)
const POSTID = urlParams.get('postId')

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

fetch(`https://jsonplaceholder.typicode.com/posts/${POSTID}`)
.then(res => res.json())
.then(post => {
  console.log(post)
  let postsWrapper = document.createElement('div')
  postsWrapper.classList.add('postsWrapper')
  pageWrapper.append(postsWrapper);

    let title = post.title
    let body = `${capitalizeFirstLetter(post.body)}.`
    let id = post.id
    let userId = post.userId
    let postElement = document.createElement('div')
    postElement.classList.add('onePost')
    postsWrapper.prepend(postElement)
    let titleElement = document.createElement('h1')
    titleElement.textContent = capitalizeFirstLetter(title)
    let authorElement = document.createElement('div')
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(author => {
      authorElement.innerHTML = `<p><span>Author: </span><a href="./user.html?userId=${userId}">${author.name}</a> / <span>All ${author.name} posts listed </span><a href="./posts.html?userId=${userId}">here</a></p>`
    })
      
    let bodyElement = document.createElement('p')
    bodyElement.textContent = `${body} ${body} ${body} ${body}`

    let commentsButton = document.createElement('input')
    commentsButton.setAttribute('type', 'button')
    commentsButton.setAttribute('value', 'Show comments')

    let commentsElement = document.createElement('div')
    commentsElement.classList.add('allComments')
    commentsElement.style.visibility = 'hidden';
    commentsElement.style.opacity = '0';
    commentsElement.style.height = '0';
    postElement.append(titleElement, authorElement, bodyElement, commentsButton, commentsElement)
    let commentsElementHeading = document.createElement('h2')
    commentsElementHeading.textContent = 'Comments'
    commentsElement.append(commentsElementHeading)

    commentsButton.addEventListener('click', event =>{
      if (event.target.value === 'Show comments') {
        event.target.value = 'Hide comments'
      } else if (event.target.value === 'Hide comments') {
        event.target.value = 'Show comments'
      }

      let height = 0;
      event.target.nextElementSibling.childNodes.forEach(element => {
        height += element.clientHeight;
      });

      if (commentsElement.style.visibility === 'hidden') {
        commentsElement.style.visibility = 'visible'
        commentsElement.style.opacity = '1'
        //40px heading marginas, 32px - 4 elementu marginas (8px*4) = reikia tobulinti, surišti su komentaru skaičiumi
        commentsElement.style.height = height + 40 + 32 + 'px' 
      }
      else {
        commentsElement.style.visibility = 'hidden'
        commentsElement.style.opacity = '0'
        commentsElement.style.height = '0'
      }
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
}).catch(error => {
  let errorMessage = document.createElement('h1')
  errorMessage.style.color = 'white'
  errorMessage.textContent = 'Nėra tokio įrašo!'
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