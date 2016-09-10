var Discord = require("discord.js");
var config = require('./config.json')
var bot = new Discord.Client();
var prefix = config.prefix

bot.on('ready',function(){
	console.log(`Logged in as: ${bot.user.name} (${bot.user.id}), prefix is ${config.prefix}`)
})

bot.on("message", function(message) {
	if(message.content.startsWith(prefix + 'ping')) {
	bot.reply(message, "Pong! **" + message.author.name+"**");
    }
	
	if(message.content.startsWith(prefix + 'servers')) {
	bot.sendMessage(message, "I'm currently on " +bot.servers.length + ' servers')
	}
	
	if(message.content.startsWith(prefix + 'play')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
	if(message.content.startsWith(prefix + 'skip')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
		if(message.content.startsWith(prefix + 'pause')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	if(message.content.startsWith(prefix + 'eval')){
		if(message.sender.id === config.owner_id){
		try{
			var code = message.content.split(" ").splice(1).join(" ")
			bot.internal.token = "Token Blocked"
			var result = eval(code)
			bot.internal.token = config.token
			bot.sendMessage(message,"```diff\n+ "+result+"```")
		}catch(err){
			bot.internal.token = config.token
			bot.sendMessage(message,"```diff\n- "+err+"```")
		}
		}else{
			bot.sendMessage(message,"U NO HAVE PERMS")
			
		}
	} 

	
			if(message.content.startsWith(prefix + 'resume')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
				if(message.content.startsWith(prefix + 'restart')) { //This command is currenlty not available at this time.
	bot.sendMessage(message, 'Restart issued by ' + message.author.name + '\nRestarting sucessfully.')
	}
	if(message.content.startsWith(prefix + 'invite')){
		bot.sendMessage(message, "My Oauth URL: "+`http://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot`)
	}
});

bot.loginWithToken(config.token);
// This version of discord.js is V8, you may install it using npm install discord.js#indev-old
// Don't mess with this file it will ruin your bot, to change stuff edit config.json
