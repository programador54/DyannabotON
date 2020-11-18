const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: 'saldo',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
  await message.delete()
	const user = message.mentions.users.first() || message.author;
	let coins = await db.fetch(
		`money_${message.guild.id}_${user.id}`
	);
	  let bank = await db.fetch(`bank_${user.id}`)

	if (coins === null) coins = '0'
	if (bank === null) bank = '0' 
	const embed = new Discord.MessageEmbed()
		.setTitle(`<a:Comendoo:777945970771361822> | Saldo do usuário: ${user.tag}`)
		.setThumbnail(user.displayAvatarURL({dynamic: true}))
		.setColor('#FF69B4')
		.setTimestamp()
		.addField('🍪 Biscoitinhos:', `\`${coins}\``, true)
		.addField('🏺 Biscoitos no pote:', `\`${bank}\``, true)
		.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
	message.channel.send(embed);
}
};
