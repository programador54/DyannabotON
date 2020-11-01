const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db')
module.exports = {
  name: 'mute',
  description: 'Tocando Músicas ',
  async execute(client, message,  
args) {
  message.delete()
let embed = new Discord.MessageEmbed() 
let embed2 = new Discord.MessageEmbed()
let modlog = await db.get(`moderation.${message.guild.id}.modlog`);
  

  if(message.member.hasPermission('MANAGE_MESSAGES')) {
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.channel.send(`<a:erron:749620489315418184> | <@${message.author.id}>, Por favor, especifique um usuário\n\> **ex**: d-mute @user 4m flood no chat`).then(msg => msg.delete({timeout: 5000}));
 

            let mainrole = message.guild.roles.cache.find(role => role.name === "Silenciado");
            let role = message.guild.roles.cache.find(role => role.name === "Silenciado");

            if (!role) return message.channel.send(`<a:erron:749620489315418184> |  ${message.author}, Crie um cargo '**Silenciado**'.`).then(msg => msg.delete({timeout: 5000}));

            let time = args[1];
            if (!time) {
                return message.reply("Você não especificou um tempo!");
            }

            member.roles.remove(mainrole.id)
            member.roles.add(role.id);
            embed.setTitle('🔇 | Usuário punido!')
            embed.setColor('#FF11AC')
           .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            embed.addField('<:users:745414008361713775> Usuário:', `<:setagem:766785344489390091>・**Tag**: \`${member.user.tag}\`\n<:setagem:766785344489390091>・**ID**: \`${member.user.id}\``)
           .addField('<:coroa:745414406266945649> Moderador:', `<:setagem:766785344489390091>・**Tag**: \`${message.author.tag}\`\n<:setagem:766785344489390091>・**ID**: \`${message.author.id}\``)
            embed.addField('<:timmes:766794858391404604> Tempo:', `\`${ms(ms(time))}\``)
           .setTimestamp()
           .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            
            if (modlog) {
   message.guild.channels.cache.get(modlog.channel).send(embed)         
  return message.channel.send(embed).then(msg => msg.delete({timeout: 11000}));
      }else {
      return message.channel.send(embed).then(msg => msg.delete({timeout: 64000}))  
        
      }
            

            setTimeout( function () {
                member.roles.add(mainrole.id)
                member.roles.remove(role.id);
                message.channel.send(embed2).then(msg => msg.delete({timeout: 11000}))
                embed2.setTitle('🔊 | Usuário desmutado!')
                embed2.setColor('#8A2BE2')
                embed2. setDescription(`O usuário ${member.user} Não está mais silenciado.`)
            }, ms(time));

        } else {
            return message.channel.send('Você não tem permissão.')
        }
} 
    }
