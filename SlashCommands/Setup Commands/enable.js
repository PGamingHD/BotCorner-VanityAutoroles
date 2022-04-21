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
        name: 'enable',
        description: 'Enable or disable the bot from its services.',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, con, args) => {
            //SLASH CMD CODE HERE!!

            con.query(`SELECT * FROM server_info WHERE serverid = '${interaction.guild.id}'`, async (error, results, fields) => {
                if (error) throw error;
                if (results && results.length) {

                    if (results[0].enabled === 0) {
                        if (results[0].channelid === 0 || results[0].roleid === 0 || results[0].vanity === 'default') {

                            const footerOptions = {
                                text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                            }

                            return interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(ee.color)
                                    .setTitle(`:x: Server Not Setup :x:`)
                                    .setDescription(`***It looks like your server has not yet been setup for the usage of this bot, please set it up with the follow commands:*** \`/Setupchannel\`, \`/Setuprole\`, \`/Setupvanity\` ***then reuse this cmmand again.***`)
                                    .setFooter(footerOptions)
                                ]
                            })
                        }
                        const footerOptions = {
                            text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                        }

                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setColor(ee.color)
                                .setTitle(`:white_check_mark: Status Changed :white_check_mark:`)
                                .setDescription(`***The bot was successfully:*** \`enabled\`***!***`)
                            ],
                            ephemeral: true
                        })

                        con.query(`UPDATE server_info SET enabled = 1 WHERE serverid = '${interaction.guild.id}'`)
                        return;
                    }

                    if (results[0].enabled === 1) {
                        const footerOptions = {
                            text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                        }

                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setColor(ee.color)
                                .setTitle(`:white_check_mark: Status Changed :white_check_mark:`)
                                .setDescription(`***The bot was successfully:*** \`disabled\`***!***`)
                            ],
                            ephemeral: true
                        })

                        con.query(`UPDATE server_info SET enabled = 0 WHERE serverid = '${interaction.guild.id}'`)
                        return;
                    }

                } else {
                    const footerOptions = {
                        text: '© discord.gg/botdeveloper | Developed by PGamingHD#0666'
                    }

                    const owner = await interaction.guild.fetchOwner()
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
            });
        }
    }