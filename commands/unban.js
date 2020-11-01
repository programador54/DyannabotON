const Discord = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
const embed = new Discord.MessageEmbed()
        const member = args[0];

        if (!member) {
             return message.channel.send(`Por favor, forneça o ID do usuário!`)
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send('✅ | Usuário desbanido com sucesso!')
           
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

    }
}