module.exports = {
  name: 'send',
  description: 'Tocando Músicas ',
  async execute(client, message,  args) {
    let msg = args.join(' ')
    message.guild.emojis.create(`${msg}`, 'NewEmoji') 
  }} 