const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");
module.exports = {
  name: "volume",
  description: "Manage the volume of the song",
  execute(client, message, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Você não tem permissão para mudar o volume da música!")
    }   
    

    
    let embed = new MessageEmbed().setColor(COLOR);

    
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOCÊ PRECISA ESTAR NO CANAL DE VOZ :/")
      return message.channel.send(embed);
    }
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Bot não está tocando nada!")
      return message.channel.send(embed);
    }
    
    if(!args[0]) {
      embed.setAuthor(`O volume atual é ${serverQueue.volume}`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setAuthor("Use apenas valores numéricos")
      return message.channel.send(embed)
    }
    
    if(args[0] > 200) {
      embed.setAuthor("Você vai morrer se atingir o limite de 200 :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`🔊・Volume definido para ${args[0]}`)
    
    message.channel.send(embed)
    
  }
};
