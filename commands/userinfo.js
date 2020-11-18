const { MessageEmbed } = require('discord.js');
var moment = require('moment');
moment().format();
moment.locale('pt-BR');
module.exports = {
	name: 'userinfo',
	description: 'Clears messages',

	async execute(client, message, args) {
		await message.delete();
		let user =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.member;

		let status;
		switch (user.presence.status) {
			case 'online':
				status = '<:Online:642306780788949022> \`Online\`';
				break;
			case 'dnd':
				status = '<:DND:642306779354497034> \`Não perturbar\`';
				break;
			case 'idle':
				status = '<:Idle:642306780231237642> \`Ausente\`';
				break;
			case 'offline':
				status = '<:Offline:642306779539046410> \`Off-line/invisível\`';
				break;
		}

		const embed = new MessageEmbed()
			.setTitle(
				`<a:dndc:747296005095030804> Informações do usuário ${user.user.tag}`
			)
			.setColor(`#FF69B4`)
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.addField('<:captacha:773959089259937842> Nome do usuário:', `\`${user.user.tag}\``)
			.addField('<:identificador:773957546612359220> ID do Discord:', `\`${user.user.id}\``)
			.addField('<:Status:773962364725755954> Status atual: ', status, true)
			.addField(
				'<:Camera:773963609356369980> Avatar link:',
				`[click aqui para baixar](${user.user.displayAvatarURL()})`
			)
			.addField(
				'<:Calendar:773962246854017024> Data de criação: ',
				`${moment(user.user.createdAt).format('LLL')}`,
				true
			)
			.addField(
				'<:Calendar3:773967508217659402> Entrou no servidor em:',
				`${moment(user.user.joinedAt).format('LLL')}`,
				true
			)
			.addField(
				'<:Positiva:773967552811761745> Cargos: ',
				user.roles.cache.map(role => `\`${role.name}\``).join(' ,'),
				true
			)
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp();
		message.channel.send(embed);
	}
};
