const baseUrl = "http://localhost:3333"

const token = JSON.parse(localStorage.getItem("@petInfo:token")) || '' //Se n vier token, vem string vazia
const requestHeaders = { // header que passamos em requisições POST, PATCH e PUT
    'Content-Type': 'application/json', // Colocamos o content type entre aspas pq não conseguimos 
    // declarar nome de chave com hifen.
    Authorization: `Bearer ${token}`,                                  
} 

const red = '#df1545'
const green = '#1668821'

// loginBody é o usuário e a senha
// INDEX.HTML --> Função que verifica se os valores de email e senha são válidos (cadastrados)
export async function loginRequest(loginBody){
    const tokenRequest = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then(async (res) => {
        if(res.ok){
            const responseJson = await res.json()
            localStorage.setItem("@petInfo:token", JSON.stringify(responseJson.token)) 
            // localStorage.setItem("@petInfo:token", JSON.stringify(responseJson.token)) 

            location.replace('./src/pages/dashboard.html')
        } else{
            const responseJson = await res.json()
            alert(responseJson.message)
            //  toast(red, responseJson.message) VER COMO FAZ ESSE TOAST
        }
    })
    return tokenRequest
}



// AS CINCO FUNÇÕES ABAIXO CONSISTEM NO CRUD!!!!
export async function createPost(postBody){
    const newPost = await fetch(`${baseUrl}/posts/create`, {
        method: "POST", // Vamos enviar uma informação
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    })
    .then(async (res) => {
        console.log(res)
        if(res.ok){
            // toast(green, 'Post criado com sucesso')
            return res.json
        } else{
            const response = await res.json()
            alert(response.message)
            // toast(red, response.message)
        }
    })

    return newPost
}

export async function readAllPosts(){
    const posts = await fetch(`${baseUrl}/posts`, {
        method: 'GET',
        headers: requestHeaders,  // pra esse get, precisamos do headers, pois precisamos do token
    })
    .then(async (res) => { // precisa do async, em razão do erro da possibilidade de token inválido/expirado
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
            // toast(red, response.message)
        }
    })

    return posts 
}

// OBS: ESSA FUNÇÃO PODE SER QUE NÃO FUNCIONE POR CAUSA DA ROTA
export async function readById(postId){
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'GET', 
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
            // toast(red, response.message)
        }
    })

    return post
}

export async function updatePost(postId, postBody){
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PATCH', 
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    })
    .then(async (res) => {
        if(res.ok){
            alert('Post atualizado com sucesso')
            // toast(green, 'Post atualizado com sucesso')

            return res.json()
        }
        else{
            const response = await res.json()
            alert(response.message)
            console.log(response.message)
            // toast(red, response.message)
        }

        return post
    })
}

export async function deletePost(postId){
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE', 
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            alert('Post deletado com sucesso')
            // toast(green, 'Post deletado com sucesso')
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
            // toast(red, response.message)
        }
    })

    return post
}