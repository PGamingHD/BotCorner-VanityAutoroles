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
        name: 'setuprole',
        description: 'Setup a specific role you would want to give if have correct vanity!',
        category: 'Setup',
        options: [{
            name: 'role',
            description: 'The specific role you would want to award users with!',
            type: ApplicationCommandOptionType.Role,
            required: true
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            const role = interaction.options.getRole("role");

            con.query(`UPDATE server_info SET roleid = ${role.id} WHERE serverid = '${interaction.guild.id}'`)
            return interaction.reply({
                content: `I successfully changed target role to <@&${role.id}>!`,
                ephemeral: true
            })
        }
    }