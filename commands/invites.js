const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'invites',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
	  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>, Você precisa ter a permissão de **GERENCIAR_SERVIDOR** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 15000}));
	  let canal = message.mentions.channels.first()
	if (!canal) return message.channel.send(`<a:erro_gelin:754787728104620182> **|** ${message.author} uso correto:\n\> **Ex**: d-invites #channel`)
		const embed = new Discord.MessageEmbed()
		.setTitle('<a:certo:749385623823188092> ¦ Canal Convites Definido!')
		.setColor('#FF69B4')
		.setThumbnail(message.guild.iconURL({dynamic: true}))
		.setDescription(`Canal ${canal} definido para mostrar os invites dos membros!`);
message.channel.send(embed).then(msg => msg.delete({timeout: 34002}))
db.set(`inviteS_${message.guild.id}`, canal.id)
	}
};
