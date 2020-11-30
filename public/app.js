const postscontainer = document.getElementById('posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.getElementById('filter')
let page = 1;


const getposts = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json()
}

// const posts = await getposts()

// Mostar no layout
const addPostsIntoDOM = async() => {
    // Armazena os dados em posts
    const posts = await getposts()

    const postsTemplate = posts.map(({ id, title, body }) =>
        `<div class="post">
    
    <div class="number">${id}</div>
    
    <div class="post-info">
    <h2 class="post-title">${title}</h2>
    <p class="post-body">${body}</p>
    </div>
        </div>
        `
    ).join(' ')

    postscontainer.innerHTML += postsTemplate
}
addPostsIntoDOM();

const geNextPosts = () => {
    setTimeout(() => {
        page++
        addPostsIntoDOM()
    }, 300)
}
const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')

        geNextPosts()

    }, 1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

    if (isPageBottomAlmostReached) {
        showLoader()
    }
})

// Filtragem

// filterInput.addEventListener('input', event => {
//     console.log(event.target.value)
// })

filterInput.addEventListener('input', event => {
    const inputvalue = event.target.value.toLocaleLowerCase()

    const posts = document.querySelectorAll('.post')

    posts.forEach((post) => {
        const postTitle = post.querySelector('.post-title').textContent.toLocaleLowerCase()
        const postBody = post.querySelector('.post-body').textContent.toLocaleLowerCase()

        if (postTitle.includes(inputvalue) || postBody.includes(inputvalue)) {
            post.style.display = 'flex'
            return
        }

        post.style.display = 'none'

    })
})