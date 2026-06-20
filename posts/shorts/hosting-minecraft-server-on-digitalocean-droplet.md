---
title: "Hosting a Minecraft Server on a DigitalOcean Droplet"
date: 2026-06-20
draft: false
pinned: false
---

- Use a Droplet with at least 4GB of memory (I was hosting > 5 people)
- Get the URL for the latest Minecraft server: <https://www.minecraft.net/en-us/download/server>

```bash
# Install OpenJDK
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt update
sudo apt install openjdk-25-jre-headless

# Install screen to leave the server running in the background
sudo apt install screen

# Enable the port for the server
sudo ufw allow 25565

# Create a new folder for the server
mkdir minecraft_server
cd minecraft_server/

# Download the latest Minecraft version (latest as of time of writing)
wget https://piston-data.mojang.com/v1/objects/823e2250d24b3ddac457a60c92a6a941943fcd6a/server.jar

# Run screen
screen

# Start the server for the first time ever
# - `-Xms1024M` -- start server to run with 1024MB of RAM at minimum
# - `-Xmx2024M` -- server uses at MOST 1024MB of RAM
java -Xms1024M -Xmx1024M -jar server.jar nogui

# After first run, edit the eula.txt
# Set eula=true
vi eula.txt

# Edit the server configuration if necessary
# More details: https://minecraft.fandom.com/wiki/Server.properties
vi server.properties

# Start server for real
java -Xms1024M -Xmx1024M -jar server.jar nogui
```

To send the server into the background using `screen`, press `ctrl + a + d`.

To manage the server in the background:

```bash
# List all background services
screen -list

# Resume session (i.e. bring to foreground)
screen -r <pid>
```

To connect to the server, use the public IP of the Droplet.

Reference article: <https://www.digitalocean.com/community/tutorials/how-to-create-a-minecraft-server-on-ubuntu-22-04>
