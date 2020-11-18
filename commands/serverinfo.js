const { MessageEmbed } = require('discord.js');
var moment = require('moment');
moment.locale('pt-BR');
module.exports = {
	name: 'serverinfo',
	description: 'Clears messages',

	async execute(client, message, args) {
		let region;
		switch (message.guild.region) {
			case 'europe':
				region = '🇪🇺 Europe';
				break;
			case 'brazil':
				region = '🇧🇷 Brasil';
				break;
			case 'us-east':
				region = '🇺🇸 us-east';
				break;
			case 'us-west':
				region = '🇺🇸 us-west';
				break;
			case 'us-south':
				region = '🇺🇸 us-south';
				break;
			case 'us-central':
				region = '🇺🇸 us-central';
				break;
		}

		const embed = new MessageEmbed()
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor('#FF69B4')
			.setTitle(`<a:dndc:747296005095030804> ${message.guild.name}`)
			.addField(
				'<:coroinha:761227142696402994> Dono do servidor:',
				`\`${message.guild.owner.user.tag}\``,
				true
			)
			.addField(
				'<:identificador:773957546612359220> ID do servidor:',
				`\`${message.guild.id}\``,
				true
			)
			.addField(
				'<:Users2:771715696635674674> Total Membros:',
				`🚶・Humanos: \`${message.guild.memberCount}\`\n🤖・Bots: \`${
					message.guild.members.cache.filter(m => m.user.bot).size
				}\``,
				true
			)
			.addField(
				'<:Has:771097272880594994> Total Canais:',
				`💬・Canais de texto: \`${
					message.guild.channels.cache.filter(ch => ch.type === 'text').size
				}\`\n🔊・Canais de voz: \`${
					message.guild.channels.cache.filter(ch => ch.type === 'voice').size
				}\``
			)
			.addField(
				'<:Calendar:773962246854017024> Data de criação:',
				moment(message.guild.createdAt).format('LLL'),
				true
			)
			.addField(
				'<:Positiva:773967552811761745> Total de Cargos: ',
				`Encontrei \`${
					message.guild.roles.cache.size
				}\` cargos neste servidor.`,
				true
			)
			.addField(`🗺 Região: `, region, true)
			.addField(
				`<:Verificado:747291211660001332> Verificação:`,
				message.guild.verified
					? 'Servidor é verificado'
					: `Servidor não é verificado`,
				true
			)
			.addField(
				'<:boosters:747291327640895558> Boosters: ',
				message.guild.premiumSubscriptionCount >= 1
					? `Há ${message.guild.premiumSubscriptionCount} Boosters!`
					: `Não há Boosters neste servidor!`,
				true
			)
			.addField(
				'<a:GIRALACABEZA:747291678439637052> Emojis: ',
				message.guild.emojis.cache.size >= 1
					? `Encontrei \`${
							message.guild.emojis.cache.size
					  }\` emojis neste servidor.`
					: 'Não há emojis',
				true
			)
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL()
			)
			.setTimestamp();

		message.channel.send(embed);
	}
};
