const Discord = require('discord.js')
const superagent = require("superagent");

module.exports = {
  name: 'beijar',
  description: 'Tocando Músicas ',
  async execute(client, message, args) {

    let User = message.mentions.members.first();
    if (!User) return message.channel.send("Mencione alguém para você beijar.");
    if (User.id == message.author.id) return message.reply("você não pode beijar si mesmo.")

    const {
        body
    } = await superagent
        .get(`https://nekos.life/api/v2/img/kiss`);

    let Embed = new Discord.MessageEmbed()
        .setDescription(`😘 <@${message.author.id}> deu um beijo em <@${User.id}> 😱`)
        .setImage(body.url)
        .setColor("#8A2BE2")
        .setTimestamp()
        .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL()) 

    message.channel.send(Embed)
}
}
