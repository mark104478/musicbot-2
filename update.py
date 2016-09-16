import subprocess

print("Welcome to MusicBot update tool")
print("Preparing to download MusicBot")
print("Ignore stuff below this line unless you are debugging")
print("-"*50)
print("RUNNING UPDATE SCRIPT")
print(subprocess.check_output("git pull",shell=True).decode()
print("-"*50)
print("Update complete")
