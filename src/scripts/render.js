import { handleDeletePost, handleDeletePostModal, handleUpdateModal, handlePublicationModal } from './dashboard.js'

const feedPosts = document.querySelector('.feed__posts')
// export async function handleDeletePost()

function createCard(object){
    // Creating HTML elements
    const post = document.createElement('div')
    const post__topPart = document.createElement('div')
    const topPart__left = document.createElement('div')
    const left__img = document.createElement('img')
    const left__name = document.createElement('p')
    const left__data = document.createElement('p')
    const topPart__right = document.createElement('div')
    const right__editButton = document.createElement('button')
    const right__excludeButton = document.createElement('button')
    const post__h1 = document.createElement('h1')
    const post__p = document.createElement('p')
    const post__button = document.createElement('button')
    
    const logoutUser = document.querySelector('.logout__user')
    const userImg = document.querySelector('.headerRightSide__img')
    
    // Assigning values to the elements
    const user = object.user
    left__img.src = user.avatar
    left__name.innerHTML = user.username
    left__data.innerHTML = object.createdAt
    right__editButton.innerHTML = 'Editar'
    right__excludeButton.innerHTML = 'Excluir'
    post__h1.innerHTML = object.title
    post__p.innerHTML = `${object.content.substr(0, 150)}...`
    post__button.innerHTML = 'Acessar publicação'
    
    
    // Assigning classes to the elements
    post.classList = 'post'
    post__topPart.classList = 'post__topPart'
    topPart__left.classList = 'topPart__left'
    left__img.classList = 'left__img'
    left__name.classList = 'left__name'
    left__data.classList = 'left__data'
    topPart__right.classList = 'topPart__right'
    right__editButton.classList = 'right__editButton'
    right__editButton.dataset.postId = object.id
    right__excludeButton.classList = 'right__excludeButton'
    right__excludeButton.dataset.postId = object.id
    post__h1.classList = 'post__h1'
    post__p.classList = 'post__p'
    post__button.classList = 'post__button'
    post__button.dataset.postId = object.id

    
    // Establishing the hierarchy
    post.append(post__topPart, post__h1, post__p, post__button)
    post__topPart.append(topPart__left, topPart__right)
    topPart__left.append(left__img, left__name, left__data)
    if(user.email === JSON.parse(localStorage.getItem("email"))){
        topPart__right.append(right__editButton, right__excludeButton)
        logoutUser.innerHTML = user.username
        userImg.src = user.avatar
    }

    return post
}



export async function render(array = []){
    if(array.message){
        alert(array.message)
    }
    
    feedPosts.innerHTML = ''
    
    array.forEach((post) => {
        const card = createCard(post)
        feedPosts.append(card)
    })

    handleUpdateModal()
    handlePublicationModal()
    handleDeletePostModal()
    handleDeletePost()
}

