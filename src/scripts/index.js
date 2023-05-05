import {loginRequest } from './requests.js'

function authentication(){
    const token = localStorage.getItem("@petInfo:token") //o token é uma string, ent n precisa do JSON.parse()

    if(token){ //se não existir, token = null, e, no if(), o null é considerado false
        location.replace('./src/pages/dashboard.html?titulo=&conteudo=')
    }
}


// INDEX.HTML --> Estamos criando a função que pega os valores inseridos nos inputs de email e senha e colocando na 
// função loginRequest
function handleLogin(){
    const inputs = document.querySelectorAll('.login__input')
    const emailInput = document.querySelector('#email')
    const button = document.querySelector('.rightSide__loginButton')
    let loginBody = {}
    let count = 0
    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach((input) => {
            if(input.value.trim() === ''){ //trim() tira todos os espaços em brancos da string
                count+=1
            } 
            loginBody[input.name] = input.value
        })
        if(count !== 0){
            count=0
            alert('Por favor, preencha os campos necessários')
        } else{
             const token = await loginRequest(loginBody)
             localStorage.setItem("email", JSON.stringify(emailInput.value))
             return token
        }
    })
}
handleLogin()
authentication()

