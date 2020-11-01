const Discord = require("discord.js");

module.exports = {
  name: 'emoji',
  description: 'Tocando Músicas ',
  async execute(client, message,  
args) { 
  message.delete();
  if (!args[0])
    return message.channel.send(
      `**${message.author.username}, a sintaxe correta é:** ` +
        "`" +
        "d-emoji nomedoemoji`"
    ); //Troque a exclamação ! da mensagem acima pelo seu prefixo
  let emoji = client.emojis.cache.find(emoji => emoji.name === args[0]);

  if (!emoji) {
    message.channel.send(
      "`" + args[0] + "` **não é um emoji deste servidor.**"
    );
  } else if (emoji.animated === true) {
    message.channel.send(`<a:${args[0]}:${emoji.id}>`);
  } else {
    message.channel.send(`<:${args[0]}:${emoji.id}>`);
  }
}
};
