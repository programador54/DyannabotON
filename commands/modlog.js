const Discord = require('discord.js');
const LogsModel = require('../models/logs');

module.exports = {
	name: 'modlog',
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
		const log = await LogsModel.findOne({
			GuildID: message.guild.id
		});
		let canal = message.mentions.channels.first();
		let logchannel = client.channels.cache.get('771043142358007899');
		const envie = new Discord.MessageEmbed();
		envie.setTitle('<a:atento:749663083676434593> | Novo Canal Definido!');
		envie.setColor('#FF11AC');
		envie.addField('🔨・Moderador:', `\`${message.author.tag}\``);
		envie.addField('💬・Canal', `\`${canal.name}\``);
		envie.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		envie.addField('🌍・Servidor:', `\`${message.guild.name}\``);

		if (!canal)
			return message.channel
				.send(
					`<a:erro_gelin:754787728104620182> **|** ${
						message.author
					} Uso incorreto, utilize o formato abaixo:\n\> **Exemplo**: d-modlog \`#canal\``
				)
				.then(msg => msg.delete({ timeout: 17000 }));
		let embed = new Discord.MessageEmbed();
		embed.setTitle('(<a:atento:749663083676434593>) Canal Definido!');
		embed.addField('<:coroinha:761227142696402994> Moderador:', message.author);
		embed
			.addField('<:Has:771097272880594994> Canal:', `${canal}`)
			.setTimestamp()
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setColor('#FF11AC')
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		if (log) {
			await LogsModel.findOneAndRemove({
				GuildID: message.guild.id
			});

			message.channel.send(embed).then(msg => msg.delete({ timeout: 29000 }));
			logchannel.send(envie);
			let newData = new LogsModel({
				logs: canal.id,
				GuildID: message.guild.id
			});
			newData.save();
		} else if (!log) {
			message.channel.send(embed).then(msg => msg.delete({ timeout: 29000 }));
			logchannel.send(envie);
			let newData = new LogsModel({
				logs: canal.id,
				GuildID: message.guild.id
			});
			newData.save();
		}
	}
};
