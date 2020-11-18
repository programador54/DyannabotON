const Discord = require('discord.js');
const RolesModel = require('../models/roles');

module.exports = {
	name: 'autorole',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.channel
				.send(
					`<a:alertA:727101012174962838> | <@${
						message.author.id
					}>, Você precisa ter a permissão de \`BANIR_MEMBROS\` para poder utilizar este comando.`
				)
				.then(msg => msg.delete({ timeout: 15000 }));
		const roles = await RolesModel.findOne({
			GuildID: message.guild.id
		});
		let role = message.mentions.roles.first();
		if (!role)
			return message.channel
				.send(
					`<a:erro_gelin:754787728104620182> **|** ${
						message.author
					} Uso incorreto, utilize o formato abaixo:\n\> **Exemplo**: d-autorole \`@role\``
				)
				.then(msg => msg.delete({ timeout: 17000 }));
		let logchannel = client.channels.cache.get('771043142358007899');
		const envie = new Discord.MessageEmbed();
		envie.setTitle('<a:atento:749663083676434593> | Novo Cargo Definido!');
		envie.setColor('#FF11AC');
		envie.addField('🔨・Moderador:', `\`${message.author.tag}\``);
		envie.addField('💬・Canal', `\`${role.name}\``);
		envie.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		envie.addField('🌍・Servidor:', `\`${message.guild.name}\``);

		let embed = new Discord.MessageEmbed();
		embed.setTitle('(<a:atento:749663083676434593>) AutoRole Ativado!');
		embed.addField('<:coroinha:761227142696402994> Moderador:', message.author);
		embed
			.addField('<:Positiva:773967552811761745> Cargo definido:', `${role}`)
			.setTimestamp()
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setColor('#FF69B4')
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		if (roles) {
			await RolesModel.findOneAndRemove({
				GuildID: message.guild.id
			});

			message.channel.send(embed).then(msg => msg.delete({ timeout: 29000 }));
			logchannel.send(envie);
			let newData = new RolesModel({
				roles: role.id,
				GuildID: message.guild.id
			});
			newData.save();
		} else if (!roles) {
			message.channel.send(embed).then(msg => msg.delete({ timeout: 29000 }));
			logchannel.send(envie);
			let newData = new RolesModel({
				roles: role.id,
				GuildID: message.guild.id
			});
			newData.save();
		}
	}
};
