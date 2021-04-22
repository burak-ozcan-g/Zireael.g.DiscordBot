const Discord = require("discord.js")
const botconfig = require("../settings.json");

module.exports.run = async (bot, message, args) => {
            
    if (message.deletable) {
        message.delete();
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Nice try bitch!").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("Silmek istediğin mesaj sayısını düzgün gir!").then(m => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.reply(`Something went wrong... ${err}`));

}

module.exports.config = {
    name: "temizle",
    description: "Mesajları temizler",
    usage: "z.temizle",
    accessableby: "Adminler",
    aliases: ['c', 'clear']
}