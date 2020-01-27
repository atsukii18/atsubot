const Discord = require("discord.js");
const fs = require("fs");
const config = require("./Storage/config.json")
const bot = new Discord.Client();

bot.login(config.token)

bot.commands = new Discord.Collection();
 
fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);
 
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0){
        console.log("Aucun fichier de commande !")
        return;
    }
    jsFiles.forEach((f,i) =>{
        var fileGet = require("./commands/" + f);
        console.log("Fichier de commande " + f + " récupéré avec succès !")
        bot.commands.set(fileGet.help.name, fileGet)
    });
});
 
bot.on("ready", function() {
    bot.user.setGame('se développer|!help');
    console.log("Connecté en tant que : " + bot.user.tag)
   
});
 
bot.on("message", message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 
    var prefix = config.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var args = messageArray.slice(1)
    var commands = bot.commands.get(command.slice(prefix.length))
    if(commands) commands.run(bot, message, args);
});

bot.on("guildMemberAdd", user =>{
let joinEmbed = new Discord.RichEmbed()
      .setColor('#e7321e')
      .setAuthor(user.user.username, user.user.displayAvatarURL)
      .setDescription("Bienvenue " + user + "  sur le serveur " + user.guild.name + " :yum: !")
      .setFooter("Atsukii_々│ Atsu'bot々")
      user.guild.channels.get("666279196762308618").send(joinEmbed)
      
});

bot.on("guildMemberRemove", user =>{
    let leaveEmbed = new Discord.RichEmbed()
      .setColor('#e7321e')
      .setAuthor(user.user.username, user.user.displayAvatarURL)
      .setDescription("Snifff... " + user.user.username + "  a quitter le serveur " + user.guild.name + " :cry: ")
      .setFooter("Atsukii_々│ Atsu'bot々")
      user.guild.channels.get("666279196762308618").send(leaveEmbed)
});
