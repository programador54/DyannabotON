const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'block-list',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		if (message.author.id === '746007271259111534') {
			if (args[0] === 'add') {
				const user = message.mentions.users.first();
				let motivo = args.slice(2.1).join(' ');
				let embed = new Discord.MessageEmbed()

					.setTitle('<a:atento:749663083676434593> | Usuário - Bloqueado')
					.setFooter(
						`${message.author.tag}`,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setAuthor(`${user.tag}`, user.displayAvatarURL())
					.setColor('#FF11AC')
					.addField('<:Users2:771715696635674674> ・Usuário:', user)
					.addField('📝・Motivo:', motivo)
					.setThumbnail(user.displayAvatarURL({ dynamic: true }))
					.setTimestamp();
				message.channel.send(embed).then(msg => msg.delete({ timeout: 29000 }));

				await db.set(`Block_${user.id}`, user.id);
			}
			if (args[0] === 'remove') {
				const user = message.mentions.users.first();
				let Embed = new Discord.MessageEmbed()
				.setTitle('<a:atento:749663083676434593> | Usuário Desbloqueado')
					.setColor('#FF11AC')
					.setAuthor(`${user.tag}`, user.displayAvatarURL())
					.setThumbnail(user.displayAvatarURL({ dynamic: true }))
					.addField('<:Users2:771715696635674674>・Usuário:', user)
					.setFooter(
						`${message.author.tag}`,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.addField(
						'💬・Comentário:',
						'**Espero que tenha aprendido a ser mais educado**.'
					)
					.setTimestamp();
				message.channel.send(Embed).then(msg => msg.delete({ timeout: 25000 }));

				await db.delete(`Block_${user.id}`);
			}
		} else {
			return message.channel
				.send(
					'🔨 **|** ${message.author} Comando que só meu desenvolvedor pode utilizar!'
				)
				.then(msg => msg.delete({ timeout: 17000 }));
		}
	}
};
