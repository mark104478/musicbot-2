// Don't mess with this file it will ruin your bot, to change stuff edit config.json
var Discord = require("discord.js");
var config = require('./config.json')
var bot = new Discord.Client();
var prefix = config.prefix
var rb = "```"

bot.on('ready',function(){
	bot.setStatus('online', config.status)
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
	${prefix}help - Shows this message.
	${prefix}ping - Ping/Pong with ms amount.
	${prefix}servers Shows amount of servers.
	${prefix}play - Plays the song you requested.
	${prefix}skip - Skips the playing song.
	${prefix}pause - Pause the current song.
	${prefix}eval - Owner only.
	${prefix}resume - Resumes paused song.
	${prefix}restart - Restarts the bot (Owner only).
	${prefix}shutdown - Shutsdown the bot (Owner only).
	${prefix}invite - Creates OAuth URL for bot.
	${prefix}setavatar - Changes the avatar, to the photo you requested.
	${prefix}git - Sends link to github repo.${rb}`)
	}
	if(message.content.startsWith(prefix + 'servers')) {
	bot.sendMessage(message, "I'm currently on **" +bot.servers.length + "** server(s)")
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
	
	if(message.content.startsWith(prefix + 'shutdown')) {
	bot.sendMessage(message, "Shutdown has been **initiated**.\nShutting down...")
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
	bot.sendMessage(message, 'Restart issued by **' + message.author.name + '**\nRestarting...')
	}
	if(message.content.startsWith(prefix + 'invite')){
		bot.sendMessage(message, "My OAuth URL: "+`http://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot`)
	}
	if(message.content.startsWith(prefix + 'git')){
		bot.sendMessage(message, "GitHub URL: https://github.com/developerCodex/musicbot")
	}
	
	if(message.content.startsWith(prefix + 'setavatar')) {
		bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later.")
	}
	
});

bot.loginWithToken(config.token);
// This version of discord.js is V8, you may install it using npm install discord.js#indev-old
// Don't mess with this file it will ruin your bot, to change stuff edit config.json
