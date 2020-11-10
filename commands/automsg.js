const puppeteer = require('puppeteer-extra');
const editJsonFile = require("edit-json-file");
const { start, postMessage, getRandomInt, getTime } = require("../functions")


module.exports.run = async (client, message, args) => {


    if(args.length < 1) { /* Checking if there is something after '!automsg' */

        console.log("no args")
        return message.channel.send("Veuillez précisez on ou off");

    };


    if(args[0] === "on") { /* Checking if command is '!automsg on' */

        message.channel.send("AutoMessage : ON");

        let variablesfile = editJsonFile(`${__dirname}/../storage/variables.json`);

        console.log(`${getTime()} > Auto messages started ! Loading browser...`);

        /* Sets the variable 'automsg' in the json file storage/variablaes.json to 'on' */
        variablesfile.set(`automsg`, "on");
        variablesfile.save();

        /* Creating browser object and loading a page */
        let browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        let page = await browser.newPage();

        /* Changing timeout delay to 20min */
        page.setDefaultNavigationTimeout(864000000);

        console.log(`${getTime()} > Browser opened !`)
        
        /* start() function logs in to discord, and writes the message defined by '!msg set' in the channels defined in storage/variablaes.json */
        start(page);

        /* Creating interval to send messages every 9:50 - 10:20 (starts about 10min after !automsg on is typed that's why there is a postMessage() function in the start() function*/
        automsg = setInterval(async function(){
            console.log(`${getTime()} > --- Resending messages ---`);
            postMessage(page);
        }, 630000 + getRandomInt(30)*1000);


        /* Checks every second if user decided to stop the automsg */

        checkinter = setInterval(async function(){

            /* Checks in storage/variablaes.json if 'automsg' value is 'off' */

            let variablesfile = editJsonFile(`${__dirname}/../storage/variables.json`);

            if (variablesfile.get(`automsg`) === "off" ) {

                /* if it is equals to 'off' stops this interval and the one posting message */
                console.log(`${getTime()} > Auto messages stopped`);
                message.channel.send("AutoMessage : OFF");

                clearInterval(checkinter, automsg);

                /* close pages */
                await page.close();
                await browser.close();
                
            };

        }, 1000);


    };

    if(args[0] == "off"){ /* Checking if command is '!automsg off' */

        let variablesfile = editJsonFile(`${__dirname}/../storage/variables.json`);

        variablesfile.set(`automsg`, "off");
        variablesfile.save();

    };

};


module.exports.help = {
    name: 'automsg'
};