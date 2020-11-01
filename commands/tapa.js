const Discord = require('discord.js')
const superagent = require("superagent");

module.exports = {
  name: 'tapa',
  description: 'Tocando Músicas ',
  async execute(client, message, args) {

    let User = message.mentions.members.first();
    if (!User) return message.channel.send("Mencione alguém para da um tapa.");
    if (User.id == message.author.id) return message.reply("você não pode dar um tapa em si mesmo.")

    const {
        body
    } = await superagent
        .get(`https://nekos.life/api/v2/img/slap`);

    let Embed = new Discord.MessageEmbed() 
        .setDescription(`😮 <@${message.author.id}> deu um tapa em <@${User.id}> 😱`)
        .setImage(body.url)
        .setColor("#8A2BE2")
        .setTimestamp()
        .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL()) 

    message.channel.send(Embed)
}
} 