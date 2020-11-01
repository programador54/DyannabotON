const Discord = require('discord.js');
module.exports = {
	name: 'set-nick',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
		if (!message.member.hasPermission('MANAGE_NICKNAMES'))
			return message.channel
				.send(
					`<a:alertA:727101012174962838> | <@${
						message.author.id
					}>, Você precisa ter a permissão de **EXPULSAR_MEMBROS** para poder utilizar este comando.`
				)
				.then(msg => msg.delete({ timeout: 15000 }));
		let member = message.mentions.members.first();
		let msg = args.slice(1).join(' ');
		if (!member) return message.channel.send(`<a:erro_gelin:754787728104620182> **|** ${message.author}, Uso correto:\n\> **Ex**: d-set-nick \`@user\` \`<msg>\``).then(msg => msg.delete({timeout: 15000}))
		if (!msg)
			return message.channel
				.send(
					`<a:erro_gelin:754787728104620182> | ${message.author}, **Novo apelido do usuário não informado**!`
				)
				.then(msg => msg.delete({ timeout: 15000 }));

		member.setNickname(`${msg}`);

		const Embed = new Discord.MessageEmbed()
			.setTitle('(<a:atento:749663083676434593>) Apelido Alterado')
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setColor('#FF1493')
			.addField(
				'Usuário:',
				`<:setagem:766785344489390091>・**Tag**: \`${
					member.user.tag
				}\`\n<:setagem:766785344489390091>・**ID**: \`${member.user.id}\``
			)
			.addField(
				'Autor da ação:',
				`<:setagem:766785344489390091>・**Tag**:\`${
					message.author.tag
				}\`\n<:setagem:766785344489390091>・**ID**: \`${message.author.id}\``
			)
			.addField('Novo Apelido:', msg)
			.setTimestamp()
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.channel.send(Embed).then(msg => msg.delete({ timeout: 300000 }));
	}
};
