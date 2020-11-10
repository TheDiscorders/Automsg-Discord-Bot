# Automsg : Discord-Bot

## What is this shit ?

This project is a **discord bot** in **node js**. His purpose is to connect to a discord account using **puppeteer** and post messages at regular intervals in discord channels.

## ⛓ Configuration

First you need to download the repository and put all the files in a folder. Then open a console **in this folder** and install the following modules : 

* Modules to install
  * npm i discord.js
  * npm i puppeteer
  * npm i edit-json-file
  
* Private data
  * email, password and token can be changed in **config file**
  * channels link to go and write message can be added in **"variables.json" in the storage file**
  
Note : The variable "channels" in variables.json file is an array, put the links as strings in it, example :

```JSON
"channels": [
    "https://link1.com",
    "https://link2.com",
    "https://link3.com"]
```


## 👌 Usage

Start the bot by doing **`node .`** in a terminal in the folder.

* Commands :
  * **`!automsg on`** -> _starts chromium and sends messages_
  * **`!automsg off`** -> _stops chromium, an error will show in console but wont affect the program_
  * **`!msg set {message}`** -> _sets a message or change the previous one_
  * **`!msg p`** -> _the bot will send the message setted with '!msg set' in the channel_
  
## 💡 Features

* Clear console with date, hour, minute and second of each actions
* Text file where you will be able to see all logs
* Code is documented if you need to find a precise piece in the code

## 🙏 Thanks
Thanks to **Firokat** for help and ideas on this project
