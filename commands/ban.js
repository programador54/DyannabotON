const Discord = require('discord.js');
const logs = require('../models/logs');
module.exports = {
	name: 'ban',
	description: 'Clears messages',

	async execute(client, message, args) {
		await message.delete();
		let aviso = new Discord.MessageEmbed();
		aviso.setColor('#FF1493');
		aviso.setDescription(
			`<a:alertA:727101012174962838> **|** Você precisa ter a permissão de \`BANIR_MEMBROS\` para poder utilizar este comando.`
		);

		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.channel
				.send(message.author, aviso)
				.then(msg => msg.delete({ timeout: 5000 }));
		if (!message.guild.me.hasPermission('BAN_MEMBERS'))
			return message.channel
				.send(
					`<a:erron:749620489315418184> **|** ${
						message.author
					}>, Eu não tenho a permissão certa.`
				)
				.then(msg => msg.delete({ timeout: 5000 }));
		const log = await logs.findOne({
			GuildID: message.guild.id
		});

		if (log) {
			let canal = message.guild.channels.cache.get(`${log.logs}`);
		 const member = await message.mentions.members.first();
			
			if (!member)
				return message.channel
					.send(
						`<a:erro_gelin:754787728104620182> **|** ${
							message.author
						} Uso incorreto, utilize o formato abaixo:\n\> **Exemplo**: d-ban \`@user\` \`<motivo>\``
					)
					.then(msg => msg.delete({ timeout: 19000 }));
			let reason = args.slice(1).join(' ');
			if (!reason) reason = 'Não informado';
			member.ban(reason);
			const embed = new Discord.MessageEmbed()
				.setTitle('(<a:atento:749663083676434593>) Usuário - Banido')
				.addField(
					'<:Users2:771715696635674674> Usuário:',
					`<:seta2:758042050594603088>・**Tag**: \`${
						member.user.tag
					}\`\n<:seta2:758042050594603088>・**ID**: \`${member.user.id}\``
				)
				.setColor('#7B68EE')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(
					`Requisitado por: ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.addField(
					'<:coroado:771743240617459742> Moderador:',
					`<:seta2:758042050594603088>**Tag**: \`${
						message.author.tag
					}\`\n<:seta2:758042050594603088>**ID**: \`${message.author.id}\``
				)
				.setImage(
					'https://cdn.discordapp.com/attachments/761784704109379625/771751101066248253/20201030_120213.gif'
				)
				.addField('<:form_dy:771743265472905227> Motivo:', reason);
			canal.send(embed);
			message.channel.send(embed).then(msg => msg.delete({ timeout: 27000 }));
		} else if (!log) {
			return message.channel
				.send(
					`<a:erro_gelin:754787728104620182> **|** ${
						message.author
					} Canal de <:Has:771097272880594994>  **modlogs** não definido!`
				)
				.then(msg => msg.delete({ timeout: 17000 }));
		}
	}
};
