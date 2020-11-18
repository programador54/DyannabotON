const { MessageAttachment } = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
	name: 'rank',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		let user =
			message.mentions.users.first() ||
			client.users.cache.get(args[0]) ||
			message.author;

		let level = client.db.get(`level_${user.id}`) || 0;
		let exp = client.db.get(`xp_${user.id}`) || 0;
		let neededXP = Math.floor(Math.pow(level / 0.1, 2));
		let fundo = await client.db.fetch(`fundo_${user.id}`);
		let every = client.db
			.all()
			.filter(i => i.ID.startsWith('xp_'))
			.sort((a, b) => b.data - a.data);
		let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;

		// v4 rank card
		//   let img = await canvacord.rank({
		//     username: user.username,
		//     discrim: user.discriminator,
		//     currentXP: exp.toString(),
		//     neededXP: neededXP.toString(),
		//     rank: rank.toString(),
		//     level: level.toString(),
		//     avatarURL: user.displayAvatarURL({ format: "png" }),
		//     background: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1000&q=80"
		//   });

		// v5 rank card
		if (fundo === null)
			fundo =
				'https://cdn.discordapp.com/attachments/771087032604033044/778018804223574045/rank.png';
		const card1 = new canvacord.Rank()
			.setUsername(user.username)
			.setDiscriminator(user.discriminator)
			.setRank(rank)
			.setRankColor('#E0FFFF', '#FF1493')
			.setLevelColor('#E0FFFF', '#9400D3')
			.setLevel(level)
			.setCurrentXP(exp)
			.setRequiredXP(neededXP)
			.setStatus(user.presence.status)
			.setBackground('IMAGE', `${fundo}`)
			.setProgressBar('#9370DB', 'COLOR')
			.setAvatar(user.displayAvatarURL({ format: 'png', size: 1024 }));

		const im = await card1.build();

		return message.channel.send(new MessageAttachment(im, 'rank.png'));
	}
};
