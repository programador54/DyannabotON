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
				status = '<:Online:642306780788949022> Online';
				break;
			case 'dnd':
				status = '<:DND:642306779354497034> Não perturbar';
				break;
			case 'idle':
				status = '<:Idle:642306780231237642> Ausente';
				break;
			case 'offline':
				status = '<:Offline:642306779539046410> Off-line/invisível';
				break;
		}

		const embed = new MessageEmbed()
			.setTitle(
				`<a:dndc:747296005095030804> Informações do usuário ${user.user.tag}`
			)
			.setColor(`#8A2BE2`)
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.addField('🔖 Nome do usuário:', `\`${user.user.tag}\``)
			.addField('🆔 ID do Discord:', `\`${user.user.id}\``)
			.addField('📶 Status atual: ', status, true)
			.addField(
				'🖼️ Avatar link:',
				`[Click aqui](${user.user.displayAvatarURL()})`
			)
			.addField(
				'📆 Data de criação: ',
				`${moment(user.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,
				true
			)
			.addField(
				'☀️ Entrou no servidor em:',
				`${moment(user.user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,
				true
			)
			.addField(
				'💼 Cargos: ',
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
