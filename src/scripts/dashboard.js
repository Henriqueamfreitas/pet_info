import { createPost, deletePost, readAllPosts, readById, updatePost, readUser } from './requests.js' 
import { render, monthArray, adjustDate } from './render.js'


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

function handleNewPost(){
    const buttonList = document.querySelectorAll('.newPostBottomPart__publishButton')
    const button = buttonList[0]
    const inputs = document.querySelectorAll('.newPost__input')
    const modalController = document.querySelector('.modal__newPost')
    const newPost = {}
    let count = 0
    
    button.addEventListener('click', async(event) => {
        event.preventDefault()
        inputs.forEach(({ name, value }) => {
            if(value.trim() === ''){
                count+=1
            }
            newPost[name] = value
            // console.log(name)
            // console.log(value)
        })
        // console.log(newPost)
        if(count !== 0){
            count = 0
            alert('Por favor, preencha os campos necessários.')
            // toast(red, 'Por favor, preencha os campos necessários.')
        } else{
            await createPost(newPost) // createPost ta dando error 500
            modalController.close()

            showDash()

            inputs.forEach((input) => {
                input.value = ''
            })   
        }
    
    })
}


function handleNewPostModal(){
    const modalNewPost = document.querySelector('.modal__newPost')
    const openModalNewPost = document.querySelector('.headerRightSide__button')
    const closeModalNewPost = document.querySelector('.newPostTopPart__button') // mesma função do cancelModal
    const cancelModalNewPost = document.querySelector('.newPostBottomPart__cancelButton') // mesma função do closeModal

    openModalNewPost.addEventListener('click', (event) => {
        modalNewPost.showModal()

        closeModal(closeModalNewPost, modalNewPost)

        if(cancelModalNewPost != undefined){
            closeModal(cancelModalNewPost, modalNewPost)
        }

        
    })
}

const modal = document.querySelector('.modal__deletePost')
export function handleDeletePostModal(){
    
    const openModalDeletePost = document.querySelectorAll('.right__excludeButton')
    // console.log(openModalDeletePost)
    const closeButton = document.querySelector('.deleteTopPart__button')
    const cancelButton = document.querySelector('.deleteButtons__cancel')
    openModalDeletePost.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            localStorage.setItem("id", event.target.dataset.postId)
            closeModal(closeButton, modal)
            closeModal(cancelButton, modal)
        })
    })
}

export async function handleDeletePost(){
    const confirmDeleteButtons = document.querySelectorAll('.deleteButtons__exclude')
    confirmDeleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const id = localStorage.getItem("id")            
            await deletePost(id)
            const posts = await readAllPosts()
            render(posts)
        })
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

export function handleUpdateModal(){
    const openButtons = document.querySelectorAll('.right__editButton')
    const modalController = document.querySelector('.modal__controler--update')
    const closeButton = document.querySelector('.updateTopPart__button')
    const inputs = document.querySelectorAll('.update__input')
    const cancelButton = document.querySelector('.update__cancelButton')
    const saveButton = document.querySelector('.update__saveButton')
    const titulo = document.querySelector('.post__h1')
    const descricao = document.querySelector('.post__p')
    
    const updateBody = {}
    let count = 0
    
    openButtons.forEach((button) => {
        button.addEventListener('click', async(event) => {
            modalController.showModal()

            const posts = await readAllPosts()
            const filteredPost = posts.filter(post => post.id === event.target.dataset.postId)
            inputs[0].value = filteredPost[0].title 
            inputs[1].value = filteredPost[0].content 

        
            closeModal(closeButton, modalController)
            closeModal(cancelButton, modalController)

            saveButton.addEventListener('click', async(e) => {
                e.preventDefault()
                inputs.forEach(({ name, value }) => {
                    if(value.trim() === ''){
                        count+=1
                    }
                    
                    updateBody[name] = value
                })
                if(count !== 0){
                    count = 0
                    alert('Por favor preencha os campos necessários')
                    // toast(red, 'Por favor preencha os campos necessários')
                } else{
                    await updatePost(event.target.dataset.postId, updateBody)
                    alert('Tarefa atualizada com sucesso')
                    // toast(green, "Tarefa atualizada com sucesso");

                    modalController.close()
                    
                    inputs.forEach((input) => {
                        input.value = "";
                      });
            
                    showDash();
                }
            })
        })
    })
}

export async function handlePublicationModal(){
    const modalControler = document.querySelector('.modal__controler--openPublication')
    const openButtons = document.querySelectorAll('.post__button')
    const closeButton = document.querySelector('.openPublicationTopPart__button')
    const modalH1 = document.querySelector('.openPublication__h1')
    const originalH1 = document.querySelector('.post__h1')
    const modalP = document.querySelector('.openPublication__p')
    const originalP = document.querySelector('.post__p')

    modalH1.classList.add('text-3')
    modalP.classList.add('text-7')

    const img = document.querySelector('.openPublicationTopLeft__img')
    const name = document.querySelector('.openPublicationTopLeft__name')
    const date = document.querySelector('.openPublicationTopLeft__date')

    // const user = await readUser()
    
    openButtons.forEach((button) => {
        button.addEventListener('click', async(event) => {
            modalControler.showModal()
            const posts = await readAllPosts()
            const filteredPost = posts.filter(post => post.id === event.target.dataset.postId)
            modalH1.innerHTML = filteredPost[0].title 
            modalP.innerHTML = filteredPost[0].content 
            const user = filteredPost[0].user
            name.innerHTML = user.username 
            img.src = user.avatar
            const dateUnadjusted = filteredPost[0].createdAt.substr(0,7)
            const year = dateUnadjusted.substr(0,4)
            const monthNumber = parseInt(dateUnadjusted.substr(5,6))
            const monthName = adjustDate(monthNumber)
            date.innerHTML = `${monthName} de ${year}`
        
            closeModal(closeButton, modalControler)
        })
    })
}


handleNewPostModal()
authentication()
showLogoutOption()
showDash()
handleNewPost()