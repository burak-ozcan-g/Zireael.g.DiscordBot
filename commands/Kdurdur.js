const Discord = require("discord.js")
const botconfig = require("../settings.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Aynı ses kanalında olmamız gerekiyor.")
    message.member.voice.channel.leave()
    return undefined
}
module.exports.config = {
    name: "durdur",
    description: "Durdurur.",
    usage: "z.durdur",
    accessableby: "Üyeler",
    aliases: ['durdur', 'stop']
}