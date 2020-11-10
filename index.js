/*

-=-=-=-=-= Made By Luzivog =-=-=-=-=-

> Program made to auto post messages on discord multiple discord channels

*/


const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const config = require(`./config`)
var util = require('util');
const { getTime } = require("./functions");
const editJsonFile = require("edit-json-file");
let variablesfile = editJsonFile(`./storage/variables.json`);

client.commands = new Enmap();

renameDate = getTime().split("/").join("-").split("|").join("-").split(":").join(".");

fs.renameSync(`${variablesfile.get("startTime")} .log`, `${renameDate} .log`);

variablesfile.set("startTime", renameDate);
variablesfile.save();


var log_file = fs.createWriteStream(__dirname + `/${renameDate} .log`, {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { 
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

fs.readdir('./commands/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      let props = require(`./commands/${file}`);
      let cmdName = file.split('.')[0];
      console.log(`Loaded command '${cmdName}'`);
      client.commands.set(cmdName, props);
    });
  });

client.login(config.token)