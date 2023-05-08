// import { createUser } from './requests.js'
const baseUrl = "http://localhost:3333"
const token = JSON.parse(localStorage.getItem("@petInfo:token")) || '' //Se n vier token, vem string vazia
const requestHeaders = { // header que passamos em requisições POST, PATCH e PUT
    'Content-Type': 'application/json', // Colocamos o content type entre aspas pq não conseguimos 
    // declarar nome de chave com hifen.
    Authorization: `Bearer ${token}`,                                  
} 


function authentication(){
    const token = localStorage.getItem("@petInfo:token") //o token é uma string, ent n precisa do JSON.parse()

    if(token){ //se não existir, token = null, e, no if(), o null é considerado false
        location.replace('./dashboard.html?titulo=&conteudo=')
    }
}

export async function createUser(userBody){
    const user = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    })
    .then( async (res) => {
        if(res.ok){
            console.log('Usuário cadastrado com sucesso')
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
        }

        return user
    })
}


async function handleCreateUser(){
    const registerButton = document.querySelector('.leftSide__loginButton')
    const inputs = document.querySelectorAll('.leftSide__input')
    let user = {}
    registerButton.addEventListener('click', async(event) => {
        event.preventDefault()
        // console.log(inputs)
        inputs.forEach(( {name, value} ) => {
            user[name] = value
        })
        // console.log(user)
        const userCorrectFormat = {}
        userCorrectFormat.username = user.username
        userCorrectFormat.email = user.email
        userCorrectFormat.password = user.password
        userCorrectFormat.avatar = user.avatar
        // console.log(userCorrectFormat)

        await createUser(userCorrectFormat)
        location.replace('../../index.html')
    })
} 




const goBackButton = document.querySelector('.leftSideTop__button')
goBackButton.addEventListener('click', (event) => {
    event.preventDefault()
    location.replace('../../index.html')
    
})

const backButton = document.querySelector('.leftSide__registerButton')
backButton.addEventListener('click', (event) => {
    event.preventDefault()
    location.replace('../../index.html')
    
})

const button = document.querySelector('.leftSide__loginButton')
const user = document.querySelector('#user')
const email = document.querySelector('#email')
const avatar = document.querySelector('#avatar')
const password = document.querySelector('#password')
user.addEventListener('keyup', (event) => {
    if((user.value !== null) && (user.value !== '') && (email.value !== null) && (email.value !== '') &&
       (avatar.value !== null) && (avatar.value !== '') && (password.value !== null) && (password.value !== '')){
        button.disabled = false
    } else{
        button.disabled = true
    }
})

email.addEventListener('keyup', (event) => {
    if((user.value !== null) && (user.value !== '') && (email.value !== null) && (email.value !== '') &&
       (avatar.value !== null) && (avatar.value !== '') && (password.value !== null) && (password.value !== '')){
        button.disabled = false
    } else{
        button.disabled = true
    }
})

avatar.addEventListener('keyup', (event) => {
    if((user.value !== null) && (user.value !== '') && (email.value !== null) && (email.value !== '') &&
       (avatar.value !== null) && (avatar.value !== '') && (password.value !== null) && (password.value !== '')){
        button.disabled = false
    } else{
        button.disabled = true
    }
})

password.addEventListener('keyup', (event) => {
    if((user.value !== null) && (user.value !== '') && (email.value !== null) && (email.value !== '') &&
       (avatar.value !== null) && (avatar.value !== '') && (password.value !== null) && (password.value !== '')){
        button.disabled = false
    } else{
        button.disabled = true
    }
})



authentication()
handleCreateUser()