const Discord = require('discord.js')
module.exports = {
	name: 'teste',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed().setDescription('Teste');
		message.channel.send(embed).then(function(message) {
			message.react('✔️');
			const filter = (reaction, user) => {
				return (
					['✔️'].includes(reaction.emoji.name) && user.id !== message.author.id
				);
			};

			message.awaitReactions(filter, { max: 1 }).then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '✔️') {
					message.delete();
				}
			});
		});
	}
};
