const {
    Message,
    MessageEmbed,
    WebhookClient,
    EmbedBuilder
} = require("discord.js");
const emoji = require("../botconfig/emojis.json")
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const client = require("../index");
const {
    connection
} = require("../index");

client.on("guildCreate", async (guild, Client) => {

    client.connection.query(`SELECT * FROM licenses WHERE serverid = ${guild.id}`, async (error, results, fields) => {
        if (error) throw error;
        if (results && results.length) {
            const currentTime = Date.now()
            const expireDate = results[0].expiretime

            if (currentTime > expireDate) {
                const owner = await guild.fetchOwner()

                await owner.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor(ee.color)
                        .setTitle(`:x: License key expired :x:`)
                        .setDescription(`***Hello there, someone just tried to invite me but it looks like your license key has expired.\nI'm very sorry that this is the case, please upgrade your key before trying again.\n\nStill having issues with this? Please contact support over at our support server found below!***`)
                    ]
                })

                await owner.send({
                    content: 'https://discord.gg/botdeveloper'
                })

                setTimeout(() => {
                    return guild.leave();
                }, 100);
                return;
            }

            client.connection.query(`SELECT * FROM server_info WHERE serverid = ${guild.id}`, async (error, results, fields) => {
                if (error) throw error;
                if (results && results.length) {
                    const owner = await guild.fetchOwner()

                    await owner.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(ee.color)
                            .setTitle(`:white_check_mark: Successfully Authenticated :white_check_mark:`)
                            .setDescription(`***Hello there Server Owner, I was successfully invited and your key is valid. Please setup me by using the commands: \`/setupchannel\`, \`/setuprole\`, \`/setupvanity\` & \`/enable\` correctly. There are descriptions on how these are used or check out the support server for further help @ discord.gg/botdeveloper***`)
                        ]
                    })
                    return;
                } else {
                    const owner = await guild.fetchOwner()

                    await owner.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(ee.color)
                            .setTitle(`:white_check_mark: Successfully Authenticated :white_check_mark:`)
                            .setDescription(`***Hello there Server Owner, I was successfully invited and your key is valid. Please setup me by using the commands:*** \`/Setupchannel\`, \`/Setuprole\`, \`/Setupvanity\` then enable the bot with \`/enable\``)
                        ]
                    })
                    client.connection.query(`INSERT INTO server_info (serverid,roleid,channelid,vanity,enabled) VALUES ('${guild.id}',0,0,'default',0);`)
                    return;
                }
            })

        } else {
            const owner = await guild.fetchOwner()
            await owner.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle(`:x: Guild not Whitelisted :x:`)
                    .setDescription(`***Hello there, someone just tried to invite me but I have not been whitelisted to this guild yet.\nPlease make sure to redeem a key and whitelist the correct guild.\n\nStill having issues with this? Please contact support over at our support server found below!***`)
                ]
            })
            await owner.send({
                content: 'https://discord.gg/botdeveloper'
            })
            setTimeout(() => {
                return guild.leave();
            }, 100);
        }
    });
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/