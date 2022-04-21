    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton,
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle,
        ModalBuilder,
        showModal,
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/embed.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json');
    const {
        EmbedBuilder
    } = require('@discordjs/builders');

    module.exports = {
        name: 'sendbutton',
        description: 'Send out the interaction button!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args) => {
            if (interaction.member.id !== '266726434855321600') return interaction.reply({
                content: 'Looks like you do not have permission to execute this command.',
                ephemeral: true
            });
            const channel = interaction.guild.channels.cache.get("963774048884629505");
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setEmoji({
                        name: "⚙️"
                    })
                    .setLabel('Verify Here')
                    .setCustomId('verifyModalButton')
                    .setStyle(ButtonStyle.Success)
                )
            const authorOptions = {
                name: `© VenomRP`, // Author = name || footer = text
                iconURL: `https://cdn.discordapp.com/attachments/957696865955119154/963184123088883793/Comp_1_3.png`
            }
            const footerOptions = {
                text: '© discord.gg/vroleplay | rpvenom.tebex.io | connect glizzyrp.com'
            }
            interaction.reply({
                content: 'Successfully sent button into correct channels.',
                ephemeral: true
            })
            return channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setAuthor(authorOptions)
                    .setImage(`https://cdn.discordapp.com/attachments/957696865955119154/963184123088883793/Comp_1_3.png`)
                    .setColor(65280)
                    .setTitle(`⚙️Venom RP Verification System⚙️`)
                    .setDescription(`\`\`\`Due to the amount of spam bots Discord currently has, \nwe would like to verify that you are not one of those. \nPlease fill out the simple math test and you will be \nverified to the server.\`\`\``)
                    .setFooter(footerOptions)
                ],
                components: [row]
            })

        }
    }