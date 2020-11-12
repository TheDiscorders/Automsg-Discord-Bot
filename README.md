# Automsg : Discord-Bot

## What is this shit ?

This project is a **Discord bot** in **[Node JS](https://nodejs.org/)**. His purpose is to connect to a discord account using **[puppeteer](https://www.npmjs.com/package/puppeteer)** and post messages at regular intervals in discord channels.

## ⛓ Configuration

First you need to download the repository and put all the files in a folder. Then open a console **in this folder** and install the following modules : 

- Install the modules with `npm i`
    * **[discord.js](https://discord.js.org/#/)**
    * **[puppeteer](https://www.npmjs.com/package/puppeteer)**
    * **[edit-json-file](https://www.npmjs.com/package/edit-json-file)**
  
* Private data
  * email, password and token can be changed in the **config.js**  file
  * channels link to go and write message can be added in **"variables.json"**  in the **storage** folder
  
Note : In the array **"channels"** in the **variables.json** file, put the links as strings in it, example :

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

* Clear dated logs
* Logs saving in separate files
* Code is documented if you need to find a precise piece in the code

## 🙏 Thanks
Thanks to **Firokat** for help and ideas on this project

tes