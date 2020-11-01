const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'set-welcome',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
	  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>, Você precisa ter a permissão de **GERENCIAR_SERVIDOR** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 15000}));
	  let canal = message.mentions.channels.first()
	if (!canal) return message.channel.send(`<a:erro_gelin:754787728104620182> **|** ${message.author} uso correto:\n\> **Ex**: d-set-welcome #channel`)
		const embed = new Discord.MessageEmbed()
		.setTitle('<a:certo:749385623823188092> ¦ Canal Welcome Definido!')
		.setColor('#FF69B4')
		.setThumbnail(message.guild.iconURL({dynamic: true}))
		.setDescription(`Canal ${canal} definido como bem-vindo!`);
message.channel.send(embed).then(msg => msg.delete({timeout: 34002}))
db.set(`welcome_${message.guild.id}`, canal.id)
	}
};
