var Discord = require("discord.js");

var bot = new Discord.Client();
var prefix = "prefix-here"

bot.on("message", function(message) {
	if(message.content.startsWith(prefix + 'ping')) {
	bot.reply(message, "Pong!" + message.author.name);
    }
	
	if(message.content.startsWith(prefix + 'servers')) {
	bot.sendMessage(message, "I'm currently on " +bot.servers.length + ' servers')
	}
	
	if(message.content.startsWith(prefix + 'play')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'The creator of this GitHub hasn't had time to get this code done try again, later.')
	}
	
	if(message.content.startsWith(prefix + 'skip')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'The creator of this GitHub hasn't had time to get this code done try again, later.')
	}
	
		if(message.content.startsWith(prefix + 'pause')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'The creator of this GitHub hasn't had time to get this code done try again, later.')
	}
	
			if(message.content.startsWith(prefix + 'resume')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'The creator of this GitHub hasn't had time to get this code done try again, later.')
	}
	
				if(message.content.startsWith(prefix + 'restart')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'Restart issued by ' + message.author.name + '\nRestarting sucessfully.)
	}
	
});

bot.loginWithToken("token");
// This version of discord.js is V8, you may install it using npm install discord.js#indev-old
// You may change the prefix var, if you would like to. And the var bot, but remember if you change the var bot, you must change all the bot functions in ur code.
