module.exports = {
  name: 'server-link',
  description: 'Tocando Músicas ',
  async execute(client, message, args) {
  await message.delete()
 let channel = message.channel;

channel.createInvite({unique: true}).then(invite => {
message.channel.send(`<a:creio:757383684436394124> | ${message.author}, Seu convite gerado:\n\> <:seta2:749261296557359184> https://discord.gg/${invite.code}`)
})
  }
} 