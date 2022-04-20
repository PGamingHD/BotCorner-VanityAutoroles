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
        run: async (client, interaction, args) => {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle(`***Welcome to VenomRP!***`)
                    .setDescription(`*So you joined VenomRP, welcome! Lets get through some general information before you start your adventure in the city.*\n\n**First, please make sure to read all rules found in <#957636092083982406> to keep up to speed on all of our rules.**\n**Secondly, please remember all of our Greenzones, commiting crimes in these will lead to major consequenses, these can be found in <#957704991752204339>!**\n**Don't know how to join the server? Check out <#957705110883033168> to find out how to join the city.**\n\n**Now that you're here, why not support is even further? The best way to support us is through upvotes. Have spare upvotes? Why not support the server and get rewarded for doing so? These can be found in <#959165592609378364>!**\n**You could also choose to support us in another way, this way is through tebex that could be found in <#957636398977007616>!**\n**We are activily searching for new Staff Members here at VenomRP, check out <#957636801466613820> and maybe apply for yourself.**\n\n***Other than feel free to join the city and RP, have a great day! : )***`)
                ]
            })
        }
    }