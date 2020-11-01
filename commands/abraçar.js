const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
	name: 'abraçar',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
	  let author = message.author;
		let User = await message.mentions.members.first();
		if (!User) return message.channel.send('Mencione alguém para o abraço.');
		if (User.id == message.author.id)
			return message.reply('você não abraçar você mesmo.');

		const { body } = await superagent.get(`https://nekos.life/api/v2/img/hug`);
const { bod } = await superagent.get(`https://nekos.life/api/v2/img/hug`);

var number = ['https://cdn.discordapp.com/attachments/758040540351824002/766665252397252658/f2805f274471676c96aff2bc9fbedd70.gif', 'https://cdn.discordapp.com/attachments/758040540351824002/766665253605736509/giphy_1.gif', 'https://cdn.discordapp.com/attachments/758040540351824002/766665253605736509/giphy_1.gif'];
	let abraços = number[Math.floor(Math.random() * number.length)];

		let Embed = new Discord.MessageEmbed()
			.setDescription(
				`🤗 <@${message.author.id}> deu um abraço em <@${User.id}> 😱`
			)
			.setImage(body.url)
			.setColor('#8A2BE2')
			.setTimestamp()
			.setFooter(
				`Solicitado por ${message.author.tag}`,
				message.author.displayAvatarURL({dynamic: true})
			);

		message.channel.send(Embed).then(function(message) {
		  message.react('💜')

		const filter = (reaction, user) => {
			return (
				['💜'].includes(reaction.emoji.name) &&
				user.id === User.id
			);
		};

		message
			.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '💜') {
				 

					let Embed6 = new Discord.MessageEmbed()
			.setDescription(
				`🤗 ${User} deu um abraço em ${author} 😱`
			)
			.setImage(abraços)
			.setColor('#8A2BE2')
			.setTimestamp()
			.setFooter(
				`Solicitado por ${User.user.tag}`,
				User.user.displayAvatarURL({dynamic: true})
			);

		message.channel.send(Embed6) 
				}
			})
		}) 
	  
	}
};
