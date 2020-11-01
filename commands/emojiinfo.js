const Discord = require('discord.js')
var moment = require('moment');
moment().format();
moment.locale('pt-BR');
module.exports = {
  name: 'emojiinfo',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
await message.delete()
  let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);

  if (!emoji) {
    message.channel.send(
      "`" + args[0] + "` **não é um emoji deste servidor.**"
    );
  } else if (emoji.animated === true) {
    const embed = new Discord.MessageEmbed()
   .setTitle('<:lbn_penssando:764820884367605760> | Informações sobre o emoji:')
   .addField('🔖 Nome do emoji:', `\`${emoji.name}\``)
  .addField('💻 ID do emoji:', `\`${emoji.id}\``)
 .addField('👀 Menção do emoji:', `\`<a:${emoji.name}:${emoji.id}>\``)
  .setColor('#FF11AC')
  .setTimestamp()
  .addField('📆 Criado em:', moment(emoji.createdAt).format('LL'), true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  .setThumbnail(emoji.url)
  message.channel.send(embed)
  } else {
const Embed = new Discord.MessageEmbed()
   .setTitle('<:lbn_penssando:764820884367605760> | Informações sobre o emoji:')
   .addField('🔖 Nome do emoji:', `\`${emoji.name}\``)
  .addField('💻 ID do emoji:', `\`${emoji.id}\``)
 .addField('👀 Menção do emoji:', `\`<:${emoji.name}:${emoji.id}>\``)
  .setColor('#FF11AC')
  .setTimestamp()
  .addField('📆 Criado em:', moment(emoji.createdAt).format('LL'), true)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  .setThumbnail(emoji.url)
  message.channel.send(Embed) 
  }
}
};
