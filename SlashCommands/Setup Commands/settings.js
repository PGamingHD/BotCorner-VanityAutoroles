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
        name: 'settings',
        description: 'View all the current server configurations!',
        category: 'Setup',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            con.query(`SELECT * FROM server_info WHERE serverid = ${interaction.guild.id}`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {

                    if (results[0].channelid === 0 || results[0].roleid === 0 || results[0].vanity === 'default') {

                        return interaction.reply({
                            content: ':x: Setup not complete, please complete setup before using this command.',
                            ephemeral: true
                        })

                    }

                    let enabled = "false"

                    if (results[0].enabled === 1) enabled = "true";

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(ee.color)
                            .setTitle(`Server Settings: ${interaction.guild.name}`)
                            .setDescription(`***Setup Channel:*** <#${results[0].channelid}>\n\n***Setup Role:*** <@&${results[0].roleid}>\n\n***Setup Vanity:*** \`${results[0].vanity}\`\n\n***Bot Enabled:*** \`${enabled}\``)
                        ]
                    })
                } else {
                    return interaction.reply({
                        content: ':x: Server Data not found, please contact support @ discord.gg/botdeveloper as soon as possible.',
                        ephemeral: true
                    })
                }
            });
        }
    }