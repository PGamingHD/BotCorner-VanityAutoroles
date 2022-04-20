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
    if (!newPresence.member) return;
    if (!newPresence.activities[0]) return;

    const inviteLink = ".gg/vroleplay";
    const role = newPresence.guild.roles.cache.get("963057655457398804");
    const channel = newPresence.guild.channels.cache.get("957705647842013194");
    const member = newPresence.member;
    // Ignore members who already have the role
    //if (!member.roles.cache.has("963057655457398804")) {
    if (newPresence.activities[0].type === 4) {
        const customStatus = newPresence.activities[0].state
        if (customStatus) {
            if (customStatus.includes(inviteLink)) {
                if (!member.roles.cache.has("963057655457398804")) {
                    member.roles.add("963057655457398804");
                    const authorOptions = {
                        name: `${newPresence.member.user.tag}`, // Author = name || footer = text
                        iconURL: `${newPresence.member.user.displayAvatarURL()}`
                    }
                    const footerOptions = {
                        text: '© discord.gg/vroleplay | rpvenom.tebex.io | connect glizzyrp.com'
                    }
                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(65280)
                            .setAuthor(authorOptions)
                            .setDescription(`<@${newPresence.member.id}> has added the vanity .gg/vroleplay into their status!`)
                            .setFooter(footerOptions)
                            .setTimestamp()
                        ]
                    })
                }
                return;
            } else if (!customStatus.includes(inviteLink)) {
                if (member.roles.cache.has("963057655457398804")) {
                    member.roles.remove("963057655457398804");
                    const authorOptions = {
                        name: `${newPresence.member.user.tag}`, // Author = name || footer = text
                        iconURL: `${newPresence.member.user.displayAvatarURL()}`
                    }
                    const footerOptions = {
                        text: '© discord.gg/vroleplay | rpvenom.tebex.io | connect glizzyrp.com'
                    }

                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(65280)
                            .setAuthor(authorOptions)
                            .setDescription(`<@${newPresence.member.id}> has removed the vanity .gg/vroleplay from their status!`)
                            .setFooter(footerOptions)
                            .setTimestamp()
                        ]
                    })
                }
                return;
            }
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