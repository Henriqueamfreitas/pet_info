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
            alert('Usuário cadastrado com sucesso')
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
        // event.preventDefault()
        inputs.forEach(( {name, value} ) => {
            user[name] = value
        })

        await createUser(user)
    })
} 


authentication()
handleCreateUser()