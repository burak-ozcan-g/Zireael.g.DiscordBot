const Discord = require("discord.js")
const botconfig = require("../settings.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(['ADMINISTRATOR'])) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['ADMINISTRATOR']) && !message.member.hasPermission('ADMINISTRATOR')) return;

        let mutedRole = message.guild.roles.cache.get('768054710355623976');
     //   let verifiedRole = message.guild.roles.cache.get('MEMBER ROLE ID (IF YOU ALREADY HAVE A ROLE DEAFULT FOR PEOPLE WHO JOINS YOUR SERVER!)');
        if(mutedRole) {
            member.roles.remove(mutedRole);
      //      member.roles.add(verifiedRole);
            message.channel.send("Kullanıcı başarıyla kaldırıldı.");
        }
}

module.exports.config = {
    name: "kaldır",
    description: "Kaldırır.",
    usage: "z.kaldır",
    accessableby: "Adminler",
    aliases: ['susturaç']
}