const editJsonFile = require('edit-json-file');
const puppeteer = require('puppeteer');
const { delay, getTime } = require('../functions');


module.exports.run = async (client, message, args) => {

    let variablesfile = editJsonFile(`${__dirname}/../storage/variables.json`);

    if(args.length < 1){
        return message.channel.send("``!msg p`` pour voir le message enregistré\n``!msg set {message}`` pour changer le message");
    }

    if(args[0] === "p"){
        return message.channel.send("Message enregistré :\n" + variablesfile.get("message"))
    }

    if(args[0] === "set"){
        /* message.content.slice(8) cuts '!msg set ' so we only have the message */
        variablesfile.set("message", message.content.slice(8))
        variablesfile.save();
        console.log(`${getTime()} > Message enregistré !`)
        return message.channel.send("Message enregistré avec succès !")
    }


};

module.exports.help = {
    name: 'msg'
};