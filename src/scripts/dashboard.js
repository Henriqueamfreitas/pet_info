import { deletePost, readAllPosts } from './requests.js' 
import { render } from './render.js'

function authentication(){
    const token = localStorage.getItem("@petInfo:token") //o token é uma string, ent n precisa do JSON.parse()

    if(!token){ //se não existir, token = null, e, no if(), o null é considerado false
        location.replace('../../index.html')
    }
}

async function showDash(){
    const allPosts = await readAllPosts()

    render(allPosts)
}


function handleNewPostModal(modal, openButton, closeButton, cancelButton){
    openButton.addEventListener('click', (event) => {
        modal.showModal()

        closeModal(closeButton, modal)

        if(cancelButton != undefined){
            closeModal(cancelButton, modal)
        }
    })
}

function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}


function showLogoutOption(){
    const logoutOption = document.querySelector('.modal__logout')
    const img = document.querySelector('.headerRightSide__img')
    const button = document.querySelector('.logout__button')

    img.addEventListener('mouseover', (event) => {

        logoutOption.showModal()
    })

    button.addEventListener('click', ()=> {
        localStorage.clear()
        location.replace('../../index.html') 
    })

    closeLogoutOption()
}

function closeLogoutOption(){
    const logoutOption = document.querySelector('.modal__logout')
    const body = document.querySelector('body')
    body.addEventListener('click', ()=> {
        logoutOption.close()
    })
}

const modalNewPost = document.querySelector('.modal__newPost')
const openModalNewPost = document.querySelector('.headerRightSide__button')
const closeModalNewPost = document.querySelector('.newPostTopPart__button') // mesma função do cancelModal
const cancelModalNewPost = document.querySelector('.newPostBottomPart__cancelButton') // mesma função do closeModal
const publishModalNewPost = document.querySelector('.newPostBottomPart__publishButton') 

handleNewPostModal(modalNewPost, openModalNewPost, closeModalNewPost, cancelModalNewPost)
authentication()
showLogoutOption()
showDash()