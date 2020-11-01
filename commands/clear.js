const cooldown = new Set();
const Discord = require('discord.js')
module.exports = {
	name: 'clear',
	description: 'Clears messages',

	async execute(client, message, args) {
		message.delete();
		if (cooldown.has(message.author.id)) {
			message.delete();
			return message.channel
				.send(
					`<a:tempo:761780107575820308> | ${
						message.author
					}, Aguarde ** 1 Minuto** para usar este comando novamente!`
				)
				.then(msg => msg.delete({ timeout: 10000 }));
		}
    let aviso = new Discord.MessageEmbed()
    aviso.setColor('#FF1493')
		aviso.setDescription(
					`<a:erro_gelin:754787728104620182> **|** Você precisa ter a permissão de \`GERENCIAR_MENSSAGENS\` para poder utilizar este comando.`
				)
				  
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(message.author, aviso).then(msg => msg.delete({timeout: 15000}));

		const amount = args.join(' ');

		if (!amount)
			return message.channel
				.send(
					`<a:Ve_ErradoTKF:754787728104620182> | ${
						message.author
					}, Forneça uma quantidade de mensagens para eu apagar!`
				)
				.then(msg => msg.delete({ timeout: 5000 }));

		if (amount > 100)
			return message.channel
				.send(
					`<a:Ve_ErradoTKF:754787728104620182> | ${
						message.author
					}, Você não pode limpar mais de 100 mensagens de uma só vez!`
				)
				.then(msg => msg.delete({ timeout: 5000 }));

		if (amount < 1)
			return message.channel
				.send(
					`<a:Ve_ErradoTKF:754787728104620182> | ${
						message.author
					}, Você precisa excluir pelo menos uma mensagem! `
				)
				.then(msg => msg.delete({ timeout: 5000 }));
    
    
    
    
		const allMessages = await message.channel.messages.fetch({ limit: amount })
    const deletable = allMessages.filter(message => !message.pinned)
    await message.channel.bulkDelete(deletable, true)
  
		message.channel
			.send(`<a:Raio:770214184604008449> **|** Foram apagadas **${amount}** mensagens!`)
			.then(msg => msg.delete({ timeout: 11000 }));
		cooldown.add(message.author.id);
		setTimeout(() => {
			cooldown.delete(message.author.id);
		}, 60000);
	}
};
