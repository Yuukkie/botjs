/*
* Definições
*/

let Discord = require('discord.js'); //npm i discord.js, definição mais importante pro bot
let fs = require("fs"); // npm i fs, handler
let client = new Discord.Client(); // definição do client
client.commands = new Discord.Collection(); // aqui vai ficar os comandos armazenados.
client.aliases = new Discord.Collection(); // aqui ficaram as aliases do comando ( váriaveis, ou seja, se o nome do comando é beijo e tem uma alias chamada "kiss", você pode usar "prefixkiss" ao invés de "prefixbeijo" )
let prefix = '!' // eu coloquei o prefixo de ! mas você pode mudar ele.
let token = '' // token do bot
/*
* Handler
*/

fs.readdir("./comandos", (erro, arquivo) => { // pode alterar o nome da pasta.
if(erro) return console.log(erro); // se tiver erro, ele irá mostrar no console
let arquivos = arquivo.filter(f=>f.split('.').pop() === 'js'); // isso serve para diferenciar os arquivos js de outros arquivos, assim o handler só roda os arquivos js
arquivos.forEach((f, i) =>{ //para cada arquivo js dentro da pasta
let ix = require(`./comandos/${f}`); // aqui é onde definimos "ix" falando que precisa do arquivo : ./comandos/${f} ( f serve para cada arquivo js )
client.commands.set(ix.config.name, ix) // aqui armazenamos o nome/local do comando, você defini o nome do comando desse jeito :
/*
* module.exports.config = {
    name: "nome do comando",
* }
*/
ix.config.aliases.forEach(alias => { //para cada alias dentro da config de um comando
client.aliases.set(alias, ix) // aqui armazenamos a alias ( uma delas )/local do comando dentro da collection client.aliases
})
})

/*
* Evento Message
*/

client.on("message", async (message) => { // inicio do evento message
if(message.author.bot) return; // proibi os bots de usarem comandos do seu bot, o por quê disso ? É que pode-se programar um bot para floodar comandos de outro bot e assim ele ficar lagado.
if(message.channel.type == 'dm') return; // proibi de usar comandos na DM do bot ( Direct Messages, mensagens privadas )
if(!message.content.startsWith(prefixo)) return; // retorna se a mensagem não iniciar com o prefixo do bot, isso previni o seu bot de não responder pessoas por comandos de outro bot
let args = message.content.slice(prefixo.length).trim().split(/ +/g) // definição de args
let comando = args.shift().toLowerCase(); // definição de comando 
let a = client.commands.get(comando) || client.aliases.get(client.commands.get(comando)); // procura o comando na collection aliases e commands
if(a) { // se achar o comando
a.run(client, message, args) // roda o comando
}
})

client.login(token); // loga o bot 
