const Discord = require('discord.js');
const logs = require('../models/logs');

module.exports = {
	name: 'kick',
	description: 'Tocando Músicas ',
	async execute(client, msg, args) {
		msg.delete();
		const log = await logs.findOne({
			GuildID: msg.guild.id
		});

		let aviso = new Discord.MessageEmbed();
		aviso.setColor('#FF1493');
		aviso.setDescription(
			`<a:alertA:727101012174962838> **|** Você precisa ter a permissão de \`EXPULSAR_MEMBROS\` para poder utilizar este comando.`
		);

		if (!msg.member.hasPermission('KICK_MEMBERS'))
			return msg.channel
				.send(msg.author, aviso)
				.then(msg => msg.delete({ timeout: 15000 }));
		if (log) {
			let canal = await msg.guild.channels.cache.get(`${log.logs}`);
			let toKick = msg.mentions.members.first();
			let reason = args.slice(1).join(' ');
			if (!args[0])
				return msg.channel
					.send(
						`<a:erron:749620489315418184> | <@${
							msg.author.id
						}> Uso incorreto, utilize o formato abaixo:\n\> **Exemplo**: d-kick \`@user\` \`<motivo>\``
					)
					.then(msg => msg.delete({ timeout: 15000 }));
			if (!toKick)
				return msg.channel
					.send(
						`<a:erron:749620489315418184> | Isso **${
							args[0]
						}** não é um membro válido!`
					)
					.then(msg => msg.delete({ timeout: 15000 }));
			if (!reason) reason = ':x: Não informado';

			if (!toKick.kickable) {
				return msg.channel
					.send(
						`<a:erron:749620489315418184> | Eu não posso kick em alguém que é moderador/administrador!`
					)
					.then(msg => msg.delete({ timeout: 15000 }));
			}

			if (toKick.kickable) {
				let Embed = new Discord.MessageEmbed()
					.setTitle('(<a:attention:745476395668471878>) Usuário Expulso!')
					.setThumbnail(toKick.user.displayAvatarURL({ dynamic: true }))
					.addField(
						'<:membro:747285567200297061> Usuário:',
						`<:setagem:766785344489390091>・**Tag**: \`${
							toKick.user.tag
						}\`\n<:setagem:766785344489390091>・**ID**: \`${toKick.user.id}\``
					)
					.addField(
						'<:reis:747285483234525275> Autor Da Ação:',
						`<:setagem:766785344489390091>・**Tag** :\`${
							msg.author.tag
						}\`\n<:setagem:766785344489390091>・**ID**: \`${msg.author.id}\``
					)
					.addField('<:lista:747285658090995902> Motivação:', reason)
					.setFooter(
						`Requisitado por ${msg.author.tag}`,
						msg.author.displayAvatarURL({ dynamic: true })
					)
					.setColor('#8A2BE2')
					.setTimestamp();
				await toKick.kick();

				canal.send(Embed);

				msg.channel.send(Embed).then(msg => msg.delete({ timeout: 64000 }));
			}
		} else if (!log) {
			return msg.channel
				.send(
					`<a:erro_gelin:754787728104620182> **|** ${
						msg.author
					} Canal <:Has:771097272880594994> **mod-logs** não definido!`
				)
				.then(msg => msg.delete({ timeout: 19000 }));
		}
	}
};
