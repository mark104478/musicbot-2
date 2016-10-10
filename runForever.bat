@echo off
echo Starting script with Forever mode on...
:main
node bot.js
echo Uh oh... Looks like the bot crashed, rebooting it now
goto main
