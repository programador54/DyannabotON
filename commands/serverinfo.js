const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Clears messages",

    async execute(client, message, args) {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
                case "brazil":
                region = '🇧🇷 Brasil';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#FF00FF')
            .setTitle(`<a:dndc:747296005095030804> ${message.guild.name}`)
            .addField("👑 Dono:", `\`${message.guild.owner.user.tag}\``, true) 
            .addField("💻 ID do servidor:", `\`${message.guild.id}\``, true) 
            .addField("👥 Membros:", `Há ${message.guild.memberCount} usuários!`, true) 
            .addField("🕹️ Membros On-line:", `Há ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} usuários online!`, true) 
            .addField("🤖 Total Bots: ", `Há ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`, true) 
            .addField("📆 Data de criação:", message.guild.createdAt.toLocaleDateString("brazil"), true) 
            .addField("💼 Total de Cargos: ", `Há ${message.guild.roles.cache.size} cargos neste servidor.`, true) 
            .addField(`🗺 Região: `, region, true) 
            .addField(`<:Verificado:747291211660001332> Verificação:`, message.guild.verified ? 'Servidor é verificado' : `Servidor não é verificado`, true) 
            .addField('<:boosters:747291327640895558> Boosters: ', message.guild.premiumSubscriptionCount >= 1 ? `Há ${message.guild.premiumSubscriptionCount} Boosters!` : `Não há Boosters neste servidor!`, true) 
            .addField("<a:GIRALACABEZA:747291678439637052> Emojis: ", message.guild.emojis.cache.size >= 1 ? `Há ${message.guild.emojis.cache.size} emojis!` : 'Não há emojis' , true) 
            .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
           
         message.channel.send(embed)
   }  
}
