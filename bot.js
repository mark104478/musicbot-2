var Discord = require("discord.js");
var config = require('./config.json')
var bot = new Discord.Client();
var prefix = config.prefix
var rb = "```"

bot.on('ready',function(){
	console.log(`Logged in as: ${bot.user.name} (${bot.user.id}), prefix is ${config.prefix}`)
})

bot.on("message", function(message) {
	if(message.sender.bot) return;
	if(message.content.startsWith(prefix + 'ping')) {
	bot.reply(message, "Pong! **" + message.author.name+"**");
    }
	if(message.content.startsWith(prefix + 'help')){
		bot.sendMessage(message,"Check your DM's **"+message.sender.name+"**")
		bot.sendMessage(message.sender.id,`${rb}ruby
	${prefix}help - Shows this message
	${prefix}ping - Ping/Pong
	${prefix}servers shows how many servers bot is in
	${prefix}play - plays music
	${prefix}skip - Skips playing song
	${prefix}pause - pauses music
	${prefix}eval - Owner only, tests code
	${prefix}resume - resumes paused music
	${prefix}restart - restarts bot
	${prefix}invite - Creates OAuth URL for bot
	${prefix}git - sends link to github repo${rb}`)
	}
	if(message.content.startsWith(prefix + 'servers')) {
	bot.sendMessage(message, "I'm currently on " +bot.servers.length + ' servers')
	}
	
	if(message.content.startsWith(prefix + 'play')) {
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
	if(message.content.startsWith(prefix + 'skip')) {
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
		if(message.content.startsWith(prefix + 'pause')) {
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	if(message.content.startsWith(prefix + 'eval')){
		if(message.sender.id === config.owner_id){
		try{
			var code = message.content.split(" ").splice(1).join(" ")
			
			var result = eval(code)
			
			
			bot.sendMessage(message,"```diff\n+ "+result+"```")
		
		}catch(err){
			
			bot.sendMessage(message,"```diff\n- "+err+"```")
		}
		}else{
			bot.sendMessage(message, "Sorry, you do not have permissisons to use this command " +message.author.name)
			
		}
	}
	 

	
			if(message.content.startsWith(prefix + 'resume')) {
	bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
				if(message.content.startsWith(prefix + 'restart')) {
	bot.sendMessage(message, 'Restart issued by ' + message.author.name + '\nRestarting sucessfully.')
	}
	if(message.content.startsWith(prefix + 'invite')){
		bot.sendMessage(message, "My OAuth URL: "+`http://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot`)
	}
	if(message.content.startsWith(prefix + 'git')){
		bot.sendMessage(message, "GitHub URL: https://github.com/developerCodex/musicbot")
	}
});

bot.loginWithToken(config.token);
// This version of discord.js is V8, you may install it using npm install discord.js#indev-old
// Don't mess with this file it will ruin your bot, to change stuff edit config.json
