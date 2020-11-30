const commentscontainer = document.getElementById('comments-container')

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