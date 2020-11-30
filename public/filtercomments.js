const commentscontainer = document.getElementById('comments-container')
const loadercontainer = document.querySelector('.loader')
let page = 1

const getComments = async() => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=5&_page=${page}`)

        return response.json()
    }
    // mostrar no layout
const addCommentsIntoDOM = async() => {
    const comments = await getComments()

    const commentsTemplate = comments.map(comment =>
        `<div class="comment">
        <div class="number">${comment.id}</div>
        <div class="comment-info">
            <h2 class="comment-name">${comment.name}</h2>
            <p class="comment-body">${comment.body}</p>
        </div>
        </div>
`
    ).join(' ')
    commentscontainer.innerHTML += commentsTemplate
}
addCommentsIntoDOM()

// loader
function loader() {
    const getNextComments = () => {
        setTimeout(() => {
            page++
            addCommentsIntoDOM()

        }, 300)
    }
    const removerloader = () => {
        setTimeout(() => {
            loadercontainer.classList.remove('show')
            getNextComments()
        }, 1000)
    }

    const shwoloader = () => {
        loadercontainer.classList.add('show')
        removerloader()
    }

    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

        if (isPageBottomAlmostReached) {
            shwoloader()
        }
    })
}
loader()

// Filtragem