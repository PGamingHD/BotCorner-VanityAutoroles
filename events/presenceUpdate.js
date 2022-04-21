const {
    Message,
    MessageEmbed,
    WebhookClient
} = require("discord.js");
const emoji = require("../botconfig/emojis.json")
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const client = require("../index");
const {
    channels
} = require("../index");
const {
    EmbedBuilder
} = require("@discordjs/builders");

client.on("presenceUpdate", async (oldPresence, newPresence) => {
    //console.log("CHANGED PRESENCE" + " " + newPresence.activities[0].type);

    //console.log(newPresence.guild.id) CHECK SERVER ID!

    if (!newPresence.member) return;
    if (!newPresence.activities[0]) return;

    // Ignore members who already have the role
    //if (!member.roles.cache.has("963057655457398804")) {
    if (newPresence.activities[0].type === 4) {
        const customStatus = newPresence.activities[0].state
        if (customStatus) {
            client.connection.query(`SELECT * FROM server_info RIGHT JOIN licenses ON server_info.serverid=licenses.serverid WHERE server_info.serverid = '${newPresence.guild.id}'`, async (error, results, fields) => {
                if (error) throw error;
                if (results && results.length) {
                    const currentTime = Date.now()
                    const expireDate = results[0].expiretime

                    //CHECK THAT IS VALID LICENSE BEFORE PERFORMING UPDATES
                    if (currentTime > expireDate) {
                        const owner = await newPresence.guild.fetchOwner()

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

                        client.connection.query(`DELETE FROM licenses WHERE serverid = ${newPresence.guild.id}`);

                        setTimeout(() => {
                            return newPresence.guild.leave();
                        }, 100);
                        return;
                    }
                    //CHECK THAT IS VALID LICENSE BEFORE PERFORMING UPDATES

                    if (results[0].enabled === 0) {
                        return;
                    }

                    const inviteLink = results[0].vanity;
                    //const role = newPresence.guild.roles.cache.get("963057655457398804");
                    const channel = newPresence.guild.channels.cache.get(results[0].channelid);
                    const member = newPresence.member;
                    const owner = await newPresence.guild.fetchOwner()
                    if (results[0].channelid === 0 || results[0].roleid === 0 || results[0].vanity === 'default') {

                        const footerOptions = {
                            text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                        }

                        return owner.send({
                            embeds: [
                                new EmbedBuilder()
                                .setColor(ee.color)
                                .setTitle(`:x: Server Not Setup :x:`)
                                .setDescription(`***It looks like your server has not yet been setup for the usage of this bot, please set it up with the follow commands:*** \`/Setupchannel\`, \`/Setuprole\`, \`/Setupvanity\`***!***`)
                                .setFooter(footerOptions)
                            ]
                        })
                    }

                    if (customStatus.includes(inviteLink)) {
                        if (!member.roles.cache.has(results[0].roleid)) {
                            member.roles.add(results[0].roleid);
                            const authorOptions = {
                                name: `${newPresence.member.user.tag}`, // Author = name || footer = text
                                iconURL: `${newPresence.member.user.displayAvatarURL()}`
                            }
                            const footerOptions = {
                                text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                            }
                            channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(ee.color)
                                    .setAuthor(authorOptions)
                                    .setDescription(`<@${newPresence.member.id}> has added the vanity \`${results[0].vanity}\` into their status!`)
                                    .setFooter(footerOptions)
                                    .setTimestamp()
                                ]
                            })
                        }
                        return;
                    } else if (!customStatus.includes(inviteLink)) {
                        if (member.roles.cache.has(results[0].roleid)) {
                            member.roles.remove(results[0].roleid);
                            const authorOptions = {
                                name: `${newPresence.member.user.tag}`, // Author = name || footer = text
                                iconURL: `${newPresence.member.user.displayAvatarURL()}`
                            }
                            const footerOptions = {
                                text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                            }

                            channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(ee.color)
                                    .setAuthor(authorOptions)
                                    .setDescription(`<@${newPresence.member.id}> has removed the vanity \`${results[0].vanity}\` from their status!`)
                                    .setFooter(footerOptions)
                                    .setTimestamp()
                                ]
                            })
                        }
                        return;
                    }
                } else {

                    const footerOptions = {
                        text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                    }

                    const owner = await newPresence.guild.fetchOwner()
                    return owner.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(ee.color)
                            .setTitle(`:x: Server data not found :x:`)
                            .setDescription(`***Looks like I could not find server data for your server, please make sure the bot is setup correctly. Does this issue still exist? Please contact support on our support server.***`)
                            .setFooter(footerOptions)
                        ]
                    })
                }
            })
            /*else if (customStatus.includes(inviteLink) && !member.roles.cache.has(role)) {
                           member.roles.add(role);
                           console.log("Someone was added to role!");
                           channel.send("Hey!");
                       } else if (!customStatus.includes(inviteLink) && member.roles.cache.has(role)) {
                           member.roles.remove(role);
                           console.log("Someone was removed from role!");
                           channel.send(new EmbedBuilder().setTitle("Hey!"));
                       }*/
        }
    } else {
        return;
    }
    //}
});