const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    if (member.presence.status === 'dnd') member.presence.status = 'Rahatsız Etmeyin';
    if (member.presence.status === 'online') member.presence.status = 'Çevirimdışı';
    if (member.presence.status === 'idle') member.presence.status = 'Boşta';
    if (member.presence.status === 'offline') member.presence.status = 'Çevirimiçi';

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, D MMMM YYYY HH:mm");
    let status = member.presence.status;

    const userEmbed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTimestamp()
    .setColor('BLUE')
    .setImage(member.user.displayAvatarURL())
    .addField("Durum", status)
//    .addField("Member ID", member.id)
//    .addField('Roller', `<@&${member._roles.join('> <@&')}>`)
    .addField("Hesap oluşturma tarihi:", ` ${moment.utc(member.user.createdAt).format("dddd, D MMMM YYYY")}`, true) 
    .addField('Sunucuya  giriş tarihi', `${joineddate} \n> ${joined} gün önce`)


    message.channel.send(userEmbed);
}

module.exports.config = {
    name: "üyebilgi",
    description: "Üyelerin bilgilerini gösterir.",
    usage: "z.üyebilgi",
    accessableby: "Üyeler",
    aliases: ['memberinfo']
}