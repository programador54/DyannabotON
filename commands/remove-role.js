const Discord = require('discord.js');
const cooldown = new Set();
module.exports = {
  name: 'remove-role',
  description: 'Tocando Músicas ',
  async execute(client, message, args) {
	await message.delete();
	if (!message.member.hasPermission('MANAGE_ROLES'))
		return message.channel
			.send(
				`<a:erro_gelin:754787728104620182> | ${message.author}, Você precisa ter a permissão de **EXPULSAR_MEMBROS** para poder utilizar este comando.`
			)
			.then(msg => msg.delete({ timeout: 15000 }));
	if (cooldown.has(message.author.id)) {
		message.delete();
		return message.channel
			.send(
				`<a:tempo:761780107575820308> | ${
					message.author
				}, Aguarde um **Minuto**  para usar este comando novamente!`
			)
			.then(msg => msg.delete({ timeout: 12000 }));
	}

	const membro = await message.mentions.members.first();
	const Role = message.mentions.roles.first();
	if (!membro)
		return message.channel
			.send(
				`<a:erro_gelin:754787728104620182> **|** ${message.author}, Use no formato:\n\> **Ex**: d-add-role @role @user`
			)
			.then(msg => msg.delete({ timeout: 8000 }));

	if (!Role)
		return message.channel
			.send(
				`<a:erro_gelin:754787728104620182> **|** ${message.author}, Use no formato:\n\> **Ex**: d-add-role @role @user`
			)
			.then(msg => msg.delete({ timeout: 8000 }));

	let embed = new Discord.MessageEmbed();

	embed.setTitle('(<a:atento:749663083676434593>) Cargo - Removido');
	embed.addField(
		'<:Users2:771715696635674674> | Usuário:',
		`<:setagem:766785344489390091>・**Tag**: \`${
			membro.user.tag
		}\`\n<:setagem:766785344489390091>・**ID**: \`${membro.user.id}\``
	);
	embed.addField(
		'<:coroado:771743240617459742> | Autor da ação:',
`<:setagem:766785344489390091>・**Tag**: \`${
			message.author.tag
		}\`\n<:setagem:766785344489390091>・**ID**: \`${message.author.id}\``
	);
	embed.addField('<:Negativo:774816351243993118> | Cargo Removido:', Role);
	embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
	embed.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
	embed.setTimestamp();
	embed.setColor('#FF11AC');
	message.channel.send(embed).then(msg => msg.delete({ timeout: 43000 }));
	await membro.roles.remove(Role);

	cooldown.add(message.author.id);
	setTimeout(() => {
		cooldown.delete(message.author.id);
	}, 46000);
} 
};
