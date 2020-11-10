module.exports = client => {

    client.user.setActivity("👁️", {type: "WATCHING"})

    console.log(`Logged in as ${client.user.tag}!`)

};