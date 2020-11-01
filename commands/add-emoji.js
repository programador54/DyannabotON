module.exports = {
	name: 'add-emoji',
	description: 'Tocando Músicas ',
	async execute(client, message, args) {
	  	  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`\> <a:alertA:727101012174962838> | ${message.author}, Você precisa ter a permissão de \`GERENCIAR_SERVIDOR\` para poder utilizar este comando.`).then(msg => msg.delete({timeout: 15000}));
	  let emoji = args.slice(1.2).join(" ")
	  
		let toggling = ['gif', 'png'];
		if (!toggling.includes(args[0])) {
			return message.channel.send(`<a:erro_gelin:754787728104620182> **|** ${message.author}, Uso correto:\n\> **Exemplo**: d-add-emoji \`png/gif\` \`ID do emoji\``).then(msg => msg.delete({timeout: 15000}))
		}
		if (!emoji) return message.channel.send(`<a:erro_gelin:754787728104620182> | ${message.author}, **ID do emoji não foi informado**!`).then(msg => msg.delete({timeout: 15000}))

		if (args[0] === 'gif') {
		  
			message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji}.gif?size=2048`, 'Emoji').then(emoji => message.channel.send(`<a:${emoji.name}:${emoji.id}> | Emoji adicionado com sucesso!`)) 
	} 
		

		if (args[0] === 'png') {
			message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji}.png`, 'Emoji').then(emoji => message.channel.send(`<:${emoji.name}:${emoji.id}> | Emoji adicionado com sucesso!`)) 
	}
}
} 