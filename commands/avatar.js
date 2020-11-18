const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Clears messages',

	async execute(client, message, args) {
		let user;

		if (message.mentions.users.first()) {
			user = message.mentions.users.first();
		} else if (args[0]) {
			user = message.guild.members.cache.get(args[0]).user;
		} else {
			user = message.author;
		}

		let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
		// 4096 é o novo maior tamanho do avatar.
		// Habilitando a dinâmica, quando o avatar do usuário estava animado/GIF, ele resultará como um formato GIF.
		// Se não for animado, resultará em um formato normal de imagem.

		const embed = new Discord.MessageEmbed()
			.setTitle(`<:Camera:773963609356369980> | Avatar do usuário: ${user.tag}`)
			.setDescription(`[clique aqui](${avatar}) para baixar a imagem`)
			.setImage(avatar)
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setColor('#8A2BE2')
			.setTimestamp();

		return message.channel.send(embed);
	}
};
