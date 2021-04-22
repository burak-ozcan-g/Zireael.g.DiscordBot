const Discord = require("discord.js")
const botconfig = require("../settings.json");
const ytdl = require("ytdl-core");
const { validateURL } = require("ytdl-core");

module.exports.run = async (bot, message, args, options) => {

    if(!message.member.voice.channel) return message.reply("Ses kanalında olmalısın.");

 //   if(message.guild.me.voice.channel) return message.channel.send("Üzgünüm ab.");

    if(!args[0]) return message.reply("saboşluk");

    var validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("urleeee");

    var info = await ytdl.getInfo(args[0]);
//
    var data = options.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voice.channel.join();

    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({

        songTitle: info.videoDetails.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id

    });

    if(!data.dispatcher){
        Play(bot, options, data);
    }else{
        message.channel.send(`Şu anda oyna1tılıyor:  ${info.videoDetails.title}  |  ${message.author.tag} tarafından.`);
    }

    options.active.set(message.guild.id, data);



    /*var options = {seek: 3, volume: 1 };

    var channelJoin = message.member.voice.channel.join()
        .then(voiceChannel => {
            var stream = ytdl(args[0], {filter: 'audioonly' });
            var dispatcher = voiceChannel.play(stream, options);

        }).catch(console.error);

    message.channel.send(`Şu anda oynatılıyor:  ${info.videoDetails.title}`);*/
}

async function Play(bot, ops, data) {

    bot.channels.cache.get(data.queue[0].announceChannel).send(`bilmemney: ${data.queue[0].songTitle} - bilmemne2: ${data.queue[0].requester}`);

    var options = { seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('bitişş', function() {
        Finish(bot, ops, this);
    })

}

function Finish(bot, ops, dispatcher){

    var fetechedData = ops.active.get(dispatcher.guildID);

    fetechedData.queue.shift();

    if(fetechedData.queue.lenght > 0){

        ops.active.set(dispatcher.guildID, fetechedData);

        Play(bot, ops, fetechedData);

    }else{

        ops.active.delete(dispatcher.guildID);

        var voiceChannel = bot.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if(voiceChannel) voiceChannel.leave();


    }

}


module.exports.config = {
    name: "oynat",
    description: "Oynatır.",
    usage: "z.oynat",
    accessableby: "Üyeler",
    aliases: ['çal', 'play']
}