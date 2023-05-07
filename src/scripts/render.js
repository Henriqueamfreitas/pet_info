import { handleDeletePost, handleDeletePostModal, handleUpdateModal, handlePublicationModal } from './dashboard.js'
import{ readUser } from './requests.js'
const feedPosts = document.querySelector('.feed__posts')
// export async function handleDeletePost()


export const monthArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                    'Outubro', 'Novembro', 'Dezembro']
export function adjustDate(parameter){
    const monthName = monthArray[parameter-1]
    return monthName
}

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
    
    // Assigning values to the elements
    const user = object.user
    left__img.src = user.avatar
    left__name.innerHTML = user.username
    const date = object.createdAt.substr(0,7)
    const year = date.substr(0,4)
    const monthNumber = parseInt(date.substr(5,6))
    const monthName = adjustDate(monthNumber)
    left__data.innerHTML = `${monthName} de ${year}`
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
    left__name.classList = 'left__name text-9'
    left__data.classList = 'left__data text-9'
    topPart__right.classList = 'topPart__right'
    right__editButton.classList = 'right__editButton text-9'
    right__editButton.dataset.postId = object.id
    right__excludeButton.classList = 'right__excludeButton text-9'
    right__excludeButton.dataset.postId = object.id
    post__h1.classList = 'post__h1 text-3'
    post__p.classList = 'post__p text-7'
    post__button.classList = 'post__button text-6'
    post__button.dataset.postId = object.id

    
    // Establishing the hierarchy
    post.append(post__topPart, post__h1, post__p, post__button)
    post__topPart.append(topPart__left, topPart__right)
    topPart__left.append(left__img, left__name, left__data)
    if(user.email === JSON.parse(localStorage.getItem("email"))){
        topPart__right.append(right__editButton, right__excludeButton)
    }

    return post
}



export async function render(array = []){
    if(array.message){
        alert(array.message)
    }
    
    feedPosts.innerHTML = ''
    
    const user = await readUser()

    const logoutUser = document.querySelector('.logout__user')
    const userImg = document.querySelector('.headerRightSide__img')

    logoutUser.innerHTML = `@${user.username}`
    userImg.src = user.avatar


    array.forEach((post) => {
        const card = createCard(post)
        feedPosts.append(card)
    })

    handleUpdateModal()
    handlePublicationModal()
    handleDeletePostModal()
    handleDeletePost()
}

