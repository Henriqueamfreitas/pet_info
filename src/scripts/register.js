function authentication(){
    const token = localStorage.getItem("@petInfo:token") //o token é uma string, ent n precisa do JSON.parse()

    if(token){ //se não existir, token = null, e, no if(), o null é considerado false
        location.replace('./dashboard.html?titulo=&conteudo=')
    }
}

authentication()