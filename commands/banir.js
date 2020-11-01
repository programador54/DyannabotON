const Discord = require('discord.js');
const logs = require('../models/logs');
module.exports = {
	name: 'banir',
	description: 'Bani pelo id',
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
			if (!args[0])
				return message.channel
					.send(
						`<a:erro_gelin:754787728104620182> **|** ${
							message.author
						} Uso incorreto, utilize o formato abaixo:\n\> **Exemplo**: d-banirid \`<ID>\` \`<motivo>\``
					)
					.then(m => m.delete({ timeout: 17000 }));
			let user = await client.users.fetch(args[0]);

			let reason = args.slice(1).join(' ');
			if (!reason) reason = 'Não informado';
			let canal = message.guild.channels.cache.get(`${log.logs}`);
			const embed = new Discord.MessageEmbed()
				.setTitle('(<a:atento:749663083676434593>) Usuário - Banido')
				.addField(
					'<:Users2:771715696635674674> Usuário:',
					`<:setagem:766785344489390091>・**Tag**: \`${
						user.tag
					}\`\n<:setagem:766785344489390091>・**ID**: \`${user.id}\``
				)
				.setImage('https://cdn.discordapp.com/attachments/761784704109379625/771751101066248253/20201030_120213.gif')
				.setColor('#FF00FF')
				.addField(
					'<:coroado:771743240617459742> Moderador:',
					`<:setagem:766785344489390091>・**Tag**: \`${
						message.author.tag
					}\`\n<:setagem:766785344489390091>・**ID**: \`${message.author.id}\``
				)
				.addField('<:form_dy:771743265472905227> Motivação:', reason)
				.setFooter(
					`Requisitado por ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setThumbnail(user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			canal.send(embed);
			message.channel.send(embed).then(msg => msg.delete({ timeout: 39000 }));
			message.guild.members.ban(user, { reason: `${reason}` });
		} else if (!log) {
			return message.channel.send(
				`<a:erro_gelin:754787728104620182> **|** ${
					message.author
				} Canal <:Has:771097272880594994> **mod-logs** não definido!`
			);
		}
	}
};
