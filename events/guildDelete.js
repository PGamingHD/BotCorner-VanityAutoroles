const {
    Message,
    MessageEmbed,
    WebhookClient
} = require("discord.js");
const emoji = require("../botconfig/emojis.json")
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const client = require("../index");

client.on("guildDelete", async (guild, client) => {
    /*
    const findBlacklist = await blacklist.findOne({
        guildID: guild.id,
    })
    if (findBlacklist) {
        webhook.send({
            content: `${emoji.error} I successfully left a blacklisted guild.`
        })
        return;
    }
    */
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/