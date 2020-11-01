const Discord =  require('discord.js');

module.exports = {
  name: 'div',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
   
let user = message.mentions.users.first() || message.author;

        message.guild.fetchInvites()
        .then(invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                    for(var i=0; i < userInvites.length; i++)
                    {
                        var invite = userInvites[i];
                        userInviteCount += invite['uses'];
                    }
                       let embed = new Discord.MessageEmbed() 
                       .setAuthor('Solicitado por: ' + message.author.username, message.author.displayAvatarURL({dynamic : true}))                      .setDescription(`<@${user.id}> Convidou **${userInviteCount}** membros para o servidor!`)
                       .setColor("#B452CD") 
                       .setThumbnail(message.guild.iconURL({dynamic : true}))
             
                       .setFooter(`${message.guild.name}`, client.user.displayAvatarURL())
                       .setTimestamp()
                        message.channel.send(embed);
})
}}

