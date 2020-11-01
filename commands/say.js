const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'say',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		const bannedWords = await [
			`CpF`,
			`identidade`,
			`CARTÃO`,
			`Conta`,
			`Cartão`,
			`. gg /`,
			`Rg`,
			`bruno`,
			`INDETIDADE`,
			`RG`,
			`ENDEREÇO`,
			`Cpf`,
			`Endereço`,
			`endereço`,
			`CPF`,
			`cpf`
		];

		if (bannedWords.some(word => message.content.toLowerCase().includes(word)))
			return;
		const logs = client.channels.cache.get('769679767305191444');
		if (message.author.id === '746007271259111534') {
		  let enviar = args.join(' ')
	message.channel.send(enviar)
		} else {
		let msg = args.join(' ');
		let texto = `<:Umaseta:769727442444484618> Mensagem enviada por ${
			message.author
		}\n\n${msg}`;
		message.channel.send(texto)
		let embed = new Discord.MessageEmbed()
			.setColor('#FF1493')
			.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
			.setTitle('💬 Comando - Say')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('👥・Usuário:', `\`${message.author.tag}\``)
			.addField('🔊・Canal:', `\`${message.channel.name}\``)
			.addField('🌍・Servidor:', `\`${message.guild.name}\``)
			.addField('📝・Mensagem:', msg)
			.addField('📆・Data:', moment(message.createdAt).format('lll'));
		logs.send(embed);
	}
	} 
};
