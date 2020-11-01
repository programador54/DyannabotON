const Discord = require('discord.js')
module.exports = {
  name: 'servericon',
  description: 'Tocando Músicas ',
  async execute(client, message, args) {
    message.delete()
    const serverIcon = message.guild.iconURL({ size: 4096, dynamic: true})
    const embed = new Discord.MessageEmbed()
   .setTitle(`<:cam:766272192659849236> | Ícone do servidor ${message.guild.name}`)
   .setImage(serverIcon)
   .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
   .setColor('#8A2BE2')
   .setTimestamp()
   message.channel.send(embed)
    
  }} 