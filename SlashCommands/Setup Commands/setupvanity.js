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
        name: 'setupvanity',
        description: 'Enter the string you want people to be using, must be exact!',
        category: 'Setup',
        options: [{
            name: 'vanity',
            description: 'The vanity string you want people to enter into their bio!',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            const vanity = interaction.options.getString("vanity");

            con.query(`UPDATE server_info SET vanity = '${vanity}' WHERE serverid = '${interaction.guild.id}'`)
            interaction.reply({
                content: `I successfully changed target vanity to \`${vanity}\`!`,
                ephemeral: true
            })


        }
    }