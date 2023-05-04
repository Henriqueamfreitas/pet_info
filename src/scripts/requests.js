const baseUrl = "http://localhost:3333"

const requestHeaders = { // header que passamos em requisições POST, PATCH e PUT
    'Content-Type': 'application/json' //Colocamos o content type entre aspas pq não conseguimos 
                                      // declarar nome de chave com hifen.
} 

const red = '#df1545'
const green = '#1668821'

// loginBody é o usuário e a senha
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
            localStorage.setItem("@petInfo:token", JSON.stringify(responseJson.token)) 

            location.replace('./src/pages/dashboard.html')
        } else{
            const responseJson = await res.json()
            alert(responseJson.message)
            //  toast(red, responseJson.message) VER COMO FAZ ESSE TOAST
        }
    })

    return tokenRequest
}
