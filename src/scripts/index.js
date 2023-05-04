import {loginRequest } from './requests.js'
// loginRequest({
//     "email": "kenzinho@mail.com",
// 	"password": "123456"
// })

function handleLogin(){
    const inputs = document.querySelectorAll('.login__input')
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
             return token
        }
    })
}

handleLogin()