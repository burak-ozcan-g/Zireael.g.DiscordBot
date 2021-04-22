const Discord = require("discord.js")
const botconfig = require("../settings.json");

module.exports.run = async (bot, message, args, options) => {
    
    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("okkey buumer");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("sorrrryy");

    if(message.member.hasPermission("KICK_MEMBERS")){

        message.channel.send("essselaaaağğğğğ");

        return guildIDData.dispatcher.emit("bititiirş");

    }

    var amountUsers = message.member.voice.channel.members.size;

    var amountSkip = Math.ceil(amountSkip / 2 );

    if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if(guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(" skippspts");

    guildIDData.queue[0].voteSkips.push(message.member.id);
    options.active.set(message.guild.id, guildIDData);

    if(guildIDData.queue[0].voteSkips.length >= amountSkip){

        message.channel.send("essselaaaağğğğğ");

        return guildIDData.dispatcher.emit("bititiirş");

    }

    message.channel.send(`her havzundibaynı ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
    
}

module.exports.config = {
    name: "geç",
    description: "",
    usage: "z.geç",
    accessableby: "Üyeler",
    aliases: ['g']
}