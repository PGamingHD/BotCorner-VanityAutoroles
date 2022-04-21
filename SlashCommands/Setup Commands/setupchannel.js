    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton,
        ApplicationCommandOptionType
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/embed.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json')

    module.exports = {
        name: 'setupchannel',
        description: 'Setup a specific channel you would want to make announce channel!',
        category: 'Setup',
        options: [{
            name: 'channel',
            description: 'The specific channel you would want to make announcement channel!',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            const channel = interaction.options.getChannel("channel");

            con.query(`UPDATE server_info SET channelid = ${channel.id} WHERE serverid = '${interaction.guild.id}'`)
            interaction.reply({
                content: `I successfully changed target channel to <#${channel.id}>!`,
                ephemeral: true
            })
        }
    }