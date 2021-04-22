const Discord = require("discord.js")

module.exports = bot => { 
    console.log(`${bot.user.username} is here!`)
    bot.user.setActivity("fiçuv fiçuv", {type: ""});
}