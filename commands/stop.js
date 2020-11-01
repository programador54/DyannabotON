const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");



const discord = require("discord.js");

module.exports = {
  name: "stop",
  description: "Stop the music and take rest ;)",
  execute(client, message, args) {
    
    
let embed = new MessageEmbed()
.setColor(COLOR);

    const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setTitle("<:microfoni:754782590778605639> | Nenhuma música está tocando agora :/")
      return message.channel.send(embed).then(msg => msg.delete({timeout: 11000}));
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setTitle("<:fones:754781166246166650> | Não há nada tocando que eu pudesse parar!")
      return message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};
