// Don't mess with this file it will ruin your bot, to change stuff edit config.json
//PS: This bot is not completed, it may error or not have correct permissions.
// PPS: LELE
var Discord = require("discord.js");
var config = require('./config.json')
var bot = new Discord.Client();
var modprefix = config.modprefix
var prefix = config.prefix
var rb = "```"
var sbl = require("./data/blservers.json")
var ubl = require("./data/blusers.json")
var fs = require("fs")
var warns = require("./data/warns.json")

bot.on('ready', function() {
	bot.setStatus('online', config.status)
	console.log(`Logged in as: ${bot.user.name} (${bot.user.id}), prefix is ${config.prefix}`)
})

bot.on("message", function(message) {
	if (message.sender.bot) return;
	if(message.channel.server === undefined && message.sender != bot.user){
		bot.sendMessage(message,"Bot only works in Servers, not Private Messages (This is so blacklist system works properely)");

		return;
	}
	if (sbl.indexOf(message.channel.server.id) != -1 && message.content.startsWith(prefix)) {
		bot.sendMessage(message, "This server is blacklisted");
		return;
	}
	if(ubl.indexOf(message.sender.id) != -1 && message.content.startsWith(prefix)){
		bot.sendMessage(message, message.user+"! You are blacklisted and can not use the bot!");
		return;
	}
	if (message.content.startsWith(prefix + "ping")) {
		bot.sendMessage(message, "Pong!", function(error, msg) {
			if (!error) {
				bot.updateMessage(msg, "Pong, **" + (msg.timestamp - message.timestamp) + "**ms");
			}
		});
	}

	if (message.content.startsWith(prefix + 'help')) {
		bot.sendMessage(message, "Check your DM's **" + message.sender.name + "**")
		bot.sendMessage(message.sender.id, `${rb}ruby
		${prefix}help - Shows this message.
		${prefix}ping - Ping/Pong with ms amount.
		${prefix}servers Shows amount of servers.
		${prefix}play - Plays the song you requested.
		${prefix}voteskip - You may vote to skip a song.
		${prefix}skip - Skips the playing song.
		${prefix}pause - Pause the current song.
		${prefix}eval - Owner only.
		${prefix}say - Admin only.
		${prefix}resume - Resumes paused song.
		${prefix}restart - Restarts the bot (Owner only).
		${prefix}shutdown - Power off the bot (Owner only).
		${prefix}invite - Creates OAuth URL for bot.
		${prefix}git - Sends link to github repo.
		${prefix}warn <user> <reason> - Warns a user for the thing they did wrong.
		${prefix}reminder <time>|<reminder> - Reminds you of something in a certain time
		${prefix}serverblacklist <add/remove> <server id> - Adds or removes servers from blacklist${rb}`)
	}
	if (message.content.startsWith(prefix + 'servers')) {
		bot.sendMessage(message, "I'm currently on **" + bot.servers.length + "** server(s)")
	}

	if (message.content.startsWith(prefix + 'play')) {
		bot.sendMessage(message, "The creator of this GitHub hasn't had time to get this code done try again, later."); //Should be done soon.
	}
	if (message.content.startsWith(prefix + "serverblacklist")) {
		if (message.sender.id === config.owner_id) {
			var c = message.content.split(" ").splice(1).join(" ")
			var args = c.split(" ");
			console.log("[DEVELOPER DEBUG] Blacklist args were: "+args)
			if (args[0] === "remove") {
				sbl.splice(sbl.indexOf(args[1]))
				fs.writeFile("./data/blservers.json", JSON.stringify(sbl))
			} else if (args[0] === "add") {
				sbl.push(args[1])
				fs.writeFile("./data/blservers.json", JSON.stringify(sbl))
			} else {
				bot.sendMessage(message, `You need to specify what to do! ${prefix}serverblacklist <add/remove> <server id>`)
			}
		} else {
			bot.sendMessage(message, "Sorry, this command is for the owner only.")
		}

	}
	if (message.content.startsWith(prefix + "userblacklist")) {
		if (message.sender.id === config.owner_id) {
			var c = message.content.split(" ").splice(1).join(" ")
			var args = c.split(" ");
			console.log("[DEVELOPER DEBUG] Blacklist args were: "+args)
			if (args[0] === "remove") {
				ubl.splice(ubl.indexOf(args[1]))
				fs.writeFile("./data/blusers.json", JSON.stringify(ubl))
			} else if (args[0] === "add") {
				ubl.push(args[1])
				fs.writeFile("./data/blusers.json", JSON.stringify(sbl))
			} else {
				bot.sendMessage(message, `You need to specify what to do! ${prefix}serverblacklist <add/remove> <server id>`)
			}
		} else {
			bot.sendMessage(message, "Sorry, this command is for the owner only.")
		}

	}
	if (message.content.startsWith(prefix + 'skip')) {
		bot.sendMessage(message, 'Skipping song...');
		bot.voiceConnetion.stopPlaying();
	}

	if (message.content.startsWith(prefix + 'pause')) {
		bot.sendMessage(message, "Pausing music...")
		bot.voiceConnection.pause()
	}

	if (message.content.startsWith(prefix + 'reminder')) {
		try {
			var c = message.content.substring(message.content.indexOf(' ') + 1, message.content.length);
			var msg = c.split(" ").splice(1).join(" ").split("|");
			msg[0] = msg[0].replace(/\s/g,'');
			var time = parseTime(msg[0]);
			var reminder = msg[1].trim();
			message.reply("I will PM you a reminder to " + reminder + " in " + time + "!");
			setTimeout(function() {
				message.author.sendMessage(message.author + " Reminder: " + reminder);
			}, time.countdown);

			function parseTime(str) {
				var num, time;
				if (str.indexOf(" ") > -1) {
					num = str.substring(0, str.indexOf(" "));
					time = str.substring(str.indexOf(" ") + 1).toLowerCase();
				} else {
					for (var i = 0; i < str.length; i++) {
						if (str.substring(0, i) && !isNaN(str.substring(0, i)) && isNaN(str.substring(0, i + 1))) {
							num = str.substring(0, i);
							time = str.substring(i);
							break;
						}
					}
				}
				if (!num || isNaN(num) || num < 1 || !time || ["d", "day", "days", "h", "hr", "hrs", "hour", "hours", "m", "min", "mins", "minute", "minutes", "s", "sec", "secs", "second", "seconds"].indexOf(time) == -1) {
					return;
				}
				var countdown = 0;
				switch (time) {
					case "d":
					case "day":
					case "days":
						countdown = num * 86400000;
						break;
					case "h":
					case "hr":
					case "hrs":
					case "hour":
					case "hours":
						countdown = num * 3600000;
						break;
					case "m":
					case "min":
					case "mins":
					case "minute":
					case "minutes":
						countdown = num * 60000;
						break;
					case "s":
					case "sec":
					case "secs":
					case "second":
					case "seconds":
						countdown = num * 1000;
						break;
				}
				return {
					num: num,
					time: time,
					countdown: countdown
				};
			}
		} catch (err) {
			message.channel.sendMessage("Invalid arguments.")
		}
	}

	if (message.content.startsWith(prefix + 'shutdown')) {
		if (message.sender.id === config.owner_id) {
			bot.sendMessage(message, "Shutdown has been **initiated**.\nShutting down...")
			setTimeout(function() {
				bot.logout()
			}, 1000)
			setTimeout(function() {
				process.exit()
			}, 2000)
		}
	}
	if (message.content.startsWith(prefix + 'warn')) {
		if (message.channel.permissionsOf(message.sender).hasPermission("kickMembers") || message.channel.permissionsOf(message.sender).hasPermission("banMembers")) {
			var c = message.content;
			var usr = message.mentions[0];
			var rsn = c.split(" ").splice(1).join(" ").replace(usr, "").replace("<@!" + usr.id + ">", "")
			var caseid = genToken(20)

			function genToken(length) {
				var key = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i = 0; i < length; i++) {
					key += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				return key;
			}

			warns[caseid] = {
				"admin": {
					"name": message.sender.name,
					"discrim": message.sender.discriminator,
					"id": message.sender.id
				},
				"user": {
					"name": usr.name,
					"discrim": usr.discrim,
					"id": usr.id
				},
				"server": {
					"name": message.channel.server.name,
					"id": message.channel.server.id,
					"channel": message.channel.name,
					"channel_id": message.channel.id,
				},
				"reason": rsn
			}
			bot.sendMessage(message, usr + " was warned for `" + rsn + "`, check logs for more info")
			fs.writeFile("./data/warns.json", JSON.stringify(warns))
		} else {
			bot.sendMessage(message, "You have to be able to kick/ban members to use this command")
		}
	}

	if (message.content.startsWith(prefix + 'say')) {
		if (message.sender.id === config.owner_id) {
			var say = message.content.split(" ").splice(1).join(" ");
			bot.sendMessage(message, say);
		}
	}

	if (message.content.startsWith(prefix + 'eval')) {
		if (message.sender.id === config.owner_id) {
			try {
				var code = message.content.split(" ").splice(1).join(" ")

				var result = eval(code)


				bot.sendMessage(message, "```diff\n+ " + result + "```")

			} catch (err) {

				bot.sendMessage(message, "```diff\n- " + err + "```")
			}
		} else {
			bot.sendMessage(message, "Sorry, you do not have permissisons to use this command, **" + message.author.name + "**.")

		}
	}

	if (message.content.startsWith(prefix + 'resume')) {
		bot.sendMessage(message, "Resuming...")
		bot.voiceConnection.resume();
	}

	if (message.content.startsWith(prefix + 'restart')) {
		if (message.sender.id === config.owner_id) {
			bot.sendMessage(message, 'Restart issued by **' + message.author.name + '**\nRestarting...')
		}
	}

	if (message.content.startsWith(prefix + 'invite')) {
		bot.sendMessage(message, "My OAuth URL: " + `http://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot`)
	}
	if (message.content.startsWith(prefix + 'git')) {
		bot.sendMessage(message, "GitHub URL: **https://github.com/developerCodex/musicbot**")
	}
});

bot.loginWithToken(config.token);
// This version of discord.js is V8, you may install it using npm install discord.js#indev-old
// Don't mess with this file it will ruin your bot, to change stuff edit config.json
