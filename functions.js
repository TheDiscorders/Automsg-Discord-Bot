const editJsonFile = require("edit-json-file");
const config = require("./config");
let variablesfile = editJsonFile(`./storage/variables.json`);

module.exports = {

    delay: function(time) {
        /* function to add delay, works with a promise*/
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    },
    
    getRandomInt: function(max) {
        /* 
        function getting a random number from 0 to arg if 1 arg and from arg1 to arg2 if 2 args
        example : 
            => getRandomInt(8) -> picks a random number from 0 to 8
            => getRandomInt(5, 65) -> picks a random number from 5 to 65
        */
        return Math.floor(Math.random() * Math.floor(max)+1);
    },

    getTime: function(){
        /* Creates date object */
        date_ob = new Date();

        date = date_ob.getDate().toString();
        month = date_ob.getMonth().toString();
        year = date_ob.getFullYear().toString();

        if(date.length === 1){
            date = "0" + date
        }
        if(month.length === 1){
            month = "0" + month
        }
        
        dmy = date + "/" + month + "/" + year

        /* Gets hours, minutes and seconds */ 
        hms = date_ob.toLocaleTimeString();

        return `[ ${dmy} | ${hms} ]`
    },

    loginToDiscord: async function(page){
        /* Logs to Discord */

        const { getTime } = require("./functions")


        console.log(`${getTime()} > Loading discord login page...`)

        await page.goto('https://discord.com/channels/@me');

        console.log(`${getTime()} > Discord login page loaded !`)
        console.log(`${getTime()} > Typing email & password...`)

        await page.click('input[type="email"]');
        await page.keyboard.type(config.email);
        await page.click('input[type="password"]');
        await page.keyboard.type(config.mdp);

        console.log(`${getTime()} > Email & password typed ! `)

        await page.click('button[type="submit"]');

        console.log(`${getTime()} > Login request to discord...`);

        await page.waitForSelector('div[class="childWrapper-anI2G9"]');
        
        console.log(`${getTime()} > Logged in to discord !`);

    },

    postMessage: async function(page){
        /* Gets the channels defined in storage/variables.json and paste message in all of them */

        const { delay, getTime } = require("./functions");
        channels = variablesfile.get("channels")


        console.log(`${getTime()} > Started sending messages, processing...`)

        for(i=0;i<channels.length;i++){
            await page.goto(channels[i])
            await page.waitForSelector('div[class="childWrapper-anI2G9"]');
            await delay(500);
            await page.keyboard.type(variablesfile.get("message"));
            await delay(100);
            await page.keyboard.press("Enter");
            await delay(500);
        };

        console.log(`${getTime()} > Finnished sending messages in the ${channels.length} channels !`)
        console.log(`${getTime()} > Waiting between 00:10:30 and 00:11:00 to relaunch`)

    },

    start: async function(page){
        /* Calls the function loginToDiscord, copyText, postMessage one by one */
        const { loginToDiscord, copyText, postMessage } = require("./functions")
        await loginToDiscord(page);
        await postMessage(page);
    },

}
