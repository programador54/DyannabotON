const Discord = require('discord.js');
module.exports = {
	name: 'ajuda',
	description: 'Ajuda com os comandos',
	async execute(client, message, args) {
		message.delete();
		const membro = message.author;
		const embed = new Discord.MessageEmbed()
			.setTitle('(<a:cicle_dsn:761716250728071219>) CENTRAL DE AJUDA!')
			.setDescription(
				'**Escolha a Categoria**:\n<a:1_:754705497743163513> | Moderação\n<a:2_:754705941290680452> | Música\n<a:3_:754706114913763359> | Utilidade\n<a:4_:754706235038761121> | Diversão\n\n <a:b_disco:758049811323945030>・Criador: ``Linux ON#0803``'
			)
			.addField(
				'<:lbn_Youtube:764244038009487390>・Canal Linux ON:',
				`[Visitar canal](https://www.youtube.com/c/LinuxON)`
			)
			.addField(
				'<:Dc:761913688679776257>・Servidor de Suporte:',
				`[Entrar no servidor](https://discord.gg/77eMtV5)`
			)
			.addField('<:Alegre:770203999810879510>・Me adicione no seu servidor.', `[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=746008303959801897&permissions=8&scope=bot)`)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setImage(
				'https://cdn.discordapp.com/attachments/758040540351824002/761948320678543441/dyanna.jpg '
			)
			.setColor('#FF11AC')
			.setTimestamp()
			.setFooter(
				`Solicitado por ${message.author.tag}`,
				client.user.displayAvatarURL()
			);
		message.channel.send(embed).then(function(message) {
			message.react('754705497743163513').then(() => message.react('754705941290680452')).then(() => message.react('754706114913763359')).then(() => message.react('754706235038761121')).then(() => message.react('754706351787081742'))
			message.delete({ timeout: 74000 });

			const menu = (reaction, user) =>
				reaction.emoji.id === '754705497743163513' &&
				user.id !== message.author.id;

			const music = (reaction, user) =>
				reaction.emoji.id === '754705941290680452' &&
				user.id !== message.author.id;

			const util = (reaction, user) =>
				reaction.emoji.id === '754706114913763359' &&
				user.id !== message.author.id;

			const game = (reaction, user) =>
				reaction.emoji.id === '754706235038761121' &&
				user.id !== message.author.id;
			const info = (reaction, user) => reaction.emoji.id === '754706351787081742' && user.id !== message.author.id;
			
			const v = message.createReactionCollector(info, { time: 60000});
			
			const w = message.createReactionCollector(game, { time: 60000 });

			const m = message.createReactionCollector(menu, { time: 60000 });

			const u = message.createReactionCollector(music, { time: 60000 });

			const n = message.createReactionCollector(util, { time: 60000 });

			m.on('collect', r => {
				let h = new Discord.MessageEmbed()
					.setTitle('👮 ¦ Categoria Moderação')
					.setDescription(
						'<:seta2:758042050594603088> **banir** ``<ID>`` - Use apenas para banir usuários que não tão no servidor usando o ID deles.\n<:seta2:758042050594603088> **ban** ``<@user/ID>`` - Bani o usuário mencionado que tiver no servidor.\n<:seta2:758042050594603088> **kick** ``@user`` Expulsa o usuário mencionado.\n<:seta2:758042050594603088> **add-role** ``@role @user`` Adicona um Cargo selecionado ao membro mencionado.\n<:seta2:758042050594603088> **modlogs** `<#canal>` Defina o canal de modlogs da moderação do bot.\n<:seta2:758042050594603088> **set-prefix** `<novo prefixo>` - Defina um novo prefixo para o bot.\n<:seta2:758042050594603088> **mute** ``@user`` - Silencia um usuário nos canais de texto.\n<:seta2:758042050594603088> **clear** -  Apaga mensagens no chat de texto.\n<:seta2:758042050594603088> **remove-role** ``@role @user`` - Remove um Cargo selecionado ao membro mencionado.'
) 
					.setTimestamp()
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/758040540351824002/761934470378684447/mod.png'
					)
					.setColor('#8A2BE2')
					.setFooter(`Solicitado por ${membro.tag}`, membro.displayAvatarURL({dynamic: true}));
				message.edit(h);
			});

			u.on('collect', r => {
				let j = new Discord.MessageEmbed()
					.setTitle('🎶 ¦ Categoria Música')
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/758040540351824002/761921869439303680/play.png'
					)
					.setColor('#8A2BE2')
					.setDescription(
						'**Comandos**:\n<:seta2:758042050594603088>・d-``play`` ``nome da música``  Escute sua música.\n<:seta2:758042050594603088>・d-``stop``  Pare a música que estiver a tocar.\n<:seta2:758042050594603088>・d-``volume`` Defina o volume da sua música.'
					)
					.setTimestamp()
					.setFooter(
						`Solicitado por ${membro.tag}`,
						membro.displayAvatarURL({ dynamic: true })
					);

				message.edit(j);
			});

			n.on('collect', r => {
				const x = new Discord.MessageEmbed()
					.setTitle('🔨 ¦ Categoria Utilidade')
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/758040540351824002/761926013264723998/util.png'
					)
					.setDescription(
						'**Comandos**:\n<:seta2:758042050594603088> **say** ``msg`` - Faça o bot falar algo no chat de texto.\n<:seta2:758042050594603088> **serverinfo** - Veja informações sobre o servidor.\n<:seta2:758042050594603088> **userinfo** - Veja informações sobre um usuário.\n<:seta2:758042050594603088> **emoji** ``nome`` - Faz o bot mandar um emoji no chat.\n<:seta2:758042050594603088> **div** - Veja a quantidade de invites de um usuário.'
					)
					.setColor('#8A2BE2')
					.setFooter(
						`Solicitado por ${membro.tag}`,
						membro.displayAvatarURL({ dynamic: true })
					)
					.setTimestamp();
				message.edit(x);
			});

			w.on('collect', r => {
				const gx = new Discord.MessageEmbed()
					.setTitle('🕹️ ¦ Categoria Diversão')
					.setDescription(
						'**Comandos**:\n<:seta2:758042050594603088> **beijar** ``@user`` - De um beijo num usuário.\n<:seta2:758042050594603088> **abraçar** ``@user`` - Use para abraçar um usuário.\n<:seta2:758042050594603088> **tapa** ``@user`` - Dar um tapa no usuário mencionado.'
					)
					.setTimestamp()
					.setFooter(`Solicitado por ${membro.tag}`, membro.displayAvatarURL({dynamic: true}))
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/758040540351824002/761929459069616138/gamer.png'
					)
					.setColor('#8A2BE2');
				message.edit(gx);
			});
			v.on('collect', r => {
			  const y = new Discord.MessageEmbed()
			 .setTitle('📊 ¦ Informações sobre mim')
		 	 .setDescription('**Sou a Dyanna™ uma bot focada em moderação de servidores.**')
		 	 .setColor('#FF11AC')
			 .addField('🕹️・Usuários:', `\`\`${client.users.cache.size}\`\``)
			.addField('<:Globo:766317788368601138>・Servidores:', `\`\`${client.guilds.cache.size}\`\``)
			.setThumbnail(client.user.displayAvatarURL())
			.addField('<a:Engrenagens:766320358961053727>・Minha versão:', '`v2.4.2`')
			.setFooter(`Requisitado por ${membro.tag}`, membro.displayAvatarURL({dynamic: true}))
		 	.setTimestamp()
			  message.edit(y)
			})
		});
	}
};
