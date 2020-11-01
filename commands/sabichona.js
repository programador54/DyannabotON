const Discord = require('discord.js');
module.exports = {
	name: 'sabichona',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		message.delete();
		let name = 'Sabichona';
		let avatar = {
			avatar:
				'https://cdn.discordapp.com/attachments/754738847073435708/771456783214313482/829b5832b956dcecb843da7c5104771d.jpg'
		};
		const pergunta = args.join(' ');
		var groceries = [
			'Tavez não',
			'Talvez sim',
			'Eu não sei vou perguntar ao Linux ON', 
			'Eu não sei, só sei que estou tomando um nescau gostoso', 
			'Vai incomodar outra pessoa, obrigado(a)',
			'Segundo minhas fontes a resposta é sim',
			'Segundo minhas fontes a resposta é não',
			'Eu também gostaria de saber'
		];
		let respostas = groceries[Math.floor(Math.random() * groceries.length)];
		if (!pergunta)
			return message.channel.send(':x: Você não informou a pergunta a mim!');
		const embed = new Discord.MessageEmbed()
			.setTitle('<:rsrsRS:766337697639694347> | Sabichona')
			.setDescription(
				`<:msg:766337158679494656>・${message.author} mandou uma pergunta.`
			)
			.addField('❓・Pergunta feita:', pergunta)
			.addField('📝・Resposta:', respostas)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/758040540351824002/766335557713657856/87fc89c327d1cfd3d413a278b6fafa09.png'
			)
			.setColor('#FF69B4')
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp();
		message.channel.createWebhook(name, avatar).then(async w => {
			await w.send({
				embeds: [embed] 
			});
			w.delete()
		});
	}
};
