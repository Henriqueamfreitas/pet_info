Criar uma aplicação frontend que interage com uma API que irá ser rodada localmente. Será um ambiente com informações em formato de blog sobre cuidados gerais com animais domésticos, como dicas, eventos e 
curiosidades. Basicamente o usuário poderá acessar esses conteúdos ao se cadastrar na plataforma e fazer seu login, então iremos lidar com um contexto de autenticação.

A documentação da API só fica acessível assim que o servidor estiver rodando, ou seja, apenas após executar os comandos:
npm install

npm run start

npm run build

npm run dev

Lembrando que os comandos, install, start, build, rodamos apenas a primeira vez que iremos utilizar a API.

Ao rodar estes comandos o seguinte usuário será criado:

{
    username:"kenzinho",
    email: "kenzinho@mail.com",
    password:"123456" ,
    avatar: "https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9"
}

Porém, nenhum post será criado, logo ao fazer um get para buscar todos os posts, o retorno será um array vazio, até que o primeiro post seja criado77

**Tecnologias**: HTML, CSS, Javascript
**Link**:
