    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/embed.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json');
    const {
        EmbedBuilder
    } = require('@discordjs/builders');

    module.exports = {
        name: 'information',
        description: 'Display some important information about VenomRP!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle(`***Welcome to Bot Corner!***`)
                    .setDescription(`**So you joined Bot Corner, now you might ask... What is this?**\n\n*Bot corner is a service Discord, providing Discord Bot Services.. We have tons of different services we offer, and can also customize orders! Purchase yourself a ticket in <#966754278725283870> or pop a ticket open to request a custom made bot for your own servers.*\n\n**Please note that you do not purchase a license key for custom bots, simply open a ticket. (We also offer hosting for the custom bots created)**`)
                ]
            })

            /*
            //WORDING & SPLITTING UP ARGS!
            let text = "Hey,how,are,you,doing?";
            const newtext = text.replace(/,/g, '\n');
            const sliced = text.split(',')
            console.log(newtext)
            sliced.forEach(word => con.query(`INSERT INTO testing (testarg) VALUES ('${word}');`))
            //sliced.forEach(word => console.log(word))
            */
        }
    }