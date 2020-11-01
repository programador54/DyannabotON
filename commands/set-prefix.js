const Discord = require('discord.js');
const prefixModel = require('../models/prefix');
const moment = require('moment');
module.exports = {
	name: 'set-prefix',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		await message.delete();
		var log = client.channels.cache.get('771043142358007899');
		const data = await prefixModel.findOne({
			GuildID: message.guild.id
		});

		if (!args[0])
			return message.channel.send('Você deve fornecer um novo **prefixo**!');

		if (args[0].length > 5)
			return message.channel.send(
				'Seu novo prefixo deve conter menos de **5** caracteres!'
			);
let embed = new Discord.MessageEmbed()
   embed.setTitle('<a:staff_lbn:765675306228514836> | Novo Prefixo!')
   embed.addField('👥・Usuário:', `\`${message.author.tag}\``)
   embed.addField('🌍・Servidor:', `\`${message.guild.name}\``)
   embed.addField('❓・Prefixo:', `\`${args[0]}\``) 
   embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
   embed.addField('📆・Data:', moment(message.createdAt).format('lll'))
   embed.setColor('#FF11AC')
   embed.setFooter(`💻 ID do usuário: ${message.author.id}`)
   
		if (data) {
			await prefixModel.findOneAndRemove({
				GuildID: message.guild.id
			});

			message.channel.send(`<:Umaseta:769727442444484618> Teu novo prefixo é agora **\`${args[0]}\`**`);
			
			log.send(embed);
			
			let newData = new prefixModel({
				Prefix: args[0],
				GuildID: message.guild.id
			});
			newData.save();
		} else if (!data) {
			message.channel.send(`<:Umaseta:769727442444484618> Teu novo prefixo é agora **\`${args[0]}\`**`);
			
			log.send(embed);

			let newData = new prefixModel({
				Prefix: args[0],
				GuildID: message.guild.id
			});
			newData.save();
		}
	}
};
