import subprocess

print("Welcome to MusicBot update tool")
print("Preparing to download MusicBot")
print("Ignore stuff below this line unless you are debugging")
print("---[UPDATE STARTING]---")
print(subprocess.check_output("git pull",shell=True).decode()
print("---[UPDATE COMPLETE]---)
print("Update complete")
