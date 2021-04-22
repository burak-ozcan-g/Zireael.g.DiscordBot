module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) 
        message.channel.send("Nice try bitch!");
    else {
        let bannedMember = await message.guild.members.ban(args);
        if(bannedMember){

        try {
            console.log(bannedMember.tag + " Amin.");
            message.channel.send (`${bannedMember} Arabistana montelendi.`)
        }
            catch(err) {
            console.log(err);
        }
    }
}
}

module.exports.config = {
    name: "yasakla",
    description: "Arabistana monteler.",
    usage: "z.yasakla",
    accessableby: "Adminler",
    aliases: ['ban']
}