const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
	name: 'daily',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		if (!message.content.startsWith('d-')) return;
await message.delete()
		let user = message.author;

		let timeout = 86400000;
		let amount = 200;

		let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

		if (daily !== null && timeout - (Date.now() - daily) > 0) {
			let time = ms(timeout - (Date.now() - daily));

			let timeEmbed = new Discord.MessageEmbed()
				.setColor('#FF11AC')
				.setTitle('<a:atento:749663083676434593> | Próxima Coleta!')
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setDescription(
					`\> Você já fez sua coleta de hoje. Uma nova coleta estará liberada às **${
						time.hours
					}h ${time.minutes}m ${time.seconds}s**`
				)
				.setFooter(
					`Requisitado por ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp();
			message.channel
				.send(timeEmbed)
				.then(msg => msg.delete({ timeout: 25000 }));
		} else {
			let moneyEmbed = new Discord.MessageEmbed()
				.setTitle('✅ | Coleta Realizada!')
				.setColor('#FF69B4')
				.setThumbnail(message.author.displayAvatarURL())
				.setTimestamp()
				.setFooter(
					`Requisitado por: ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(
					`${message.author} Hoje você coletou **${amount}** 🍪 biscoitos.`
				);
			message.channel.send(moneyEmbed);
			db.add(`money_${message.guild.id}_${user.id}`, 200);
			db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
		}
	}
};
