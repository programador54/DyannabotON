const Discord = require('discord.js')
module.exports = {
  name: 'fundorank',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
     let level = client.db.get(`level_${message.author.id}`) || 0;
     if (level > 25) {
       const msg = args.join(' ')
       client.db.set(`fundo_${message.author.id}`, msg) 
       message.channel.send('Imagem setada!')
       
     }else {
       return message.channel.send(`<a:Discord:769276438619750461> **|** ${message.author} Somente usuários com **nível 25** podem mudar o fundo do rank!`).then(msg => msg.delete({timeout: 4700}))
     } 
  }} 