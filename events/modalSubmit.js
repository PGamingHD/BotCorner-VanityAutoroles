const {
    Message,
    MessageEmbed,
    WebhookClient,
    Formatters,
    Interaction
} = require("discord.js");
const emoji = require("../botconfig/emojis.json")
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const client = require("../index");
const {
    EmbedBuilder
} = require("@discordjs/builders");

client.on("modalSubmit", async (modal) => {
    try {
        const channel = client.channels.cache.get('963775182332371014');
        if (modal.customId === 'verifyModal') {
            const firstResponse = modal.getTextInputValue('verificationInput')
            const rightAnswer = randomNumber1 + randomNumber2;
            await modal.deferReply({
                ephemeral: true
            });
            const responseFinal = parseInt(firstResponse);
            const rightAnswerFinal = parseInt(rightAnswer);

            const member = modal.member;

            if (responseFinal === rightAnswerFinal) {
                modal.followUp("```✅ Welcome to VenomRP, the verification was successful!```")
                channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor(65280)
                        .setTitle("A new verification has been submitted")
                        .setDescription(`Verification User: ${modal.user}\n\n\`\`\`Verification answer: ${randomNumber1 + randomNumber2}\`\`\`\n\nUser Answer: \`${firstResponse}\`\n\nFinal: \`Success\`\n\nNote: \`User has been given verified roles.\``)
                    ]
                })
                if (member.roles.cache.has("963057655457398804")) return;
                member.roles.add("957643475275382884");
            } else {
                modal.followUp("```❌ Verification Failed, please answer the math question correctly.```")
                channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor(ee.color)
                        .setTitle("A new verification has been submitted")
                        .setDescription(`Verification User: ${modal.user}\n\n\`\`\`Verification answer: ${randomNumber1 + randomNumber2}\`\`\`\n\nUser Answer: \`${firstResponse}\`\n\nFinal: \`Failed\`\n\nNote: \`User has not been given verified roles.\``)
                    ]
                })
            }
        }

        if (modal.customId === 'bugModal') {
            const bug = client.channels.cache.get("957634913773949048");
            const reportedbug = modal.getTextInputValue('reportedBug')
            await modal.deferReply({
                ephemeral: true
            });

            modal.followUp("```✅ Thank you for submitting a bug report, the bug report will be reviewed by our Development team asap.```")
            const footerOptions = {
                text: 'Developed by: PGamingHD#0666',
                iconURL: `${modal.user.avatarURL()}`,
            }
            bug.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle(`Bug Report Submitted`)
                    .setDescription(`***Reported by:*** ${modal.user}\n\n**Bug Explanation:**\n\`\`\`${reportedbug}\`\`\``)
                    .setFooter(footerOptions)
                ]
            })
        }

        if (modal.customId === 'suggestModal') {
            const suggestion = client.channels.cache.get("957634798740987964");
            const suggested = modal.getTextInputValue('suggestedChange')
            await modal.deferReply({
                ephemeral: true
            });

            modal.followUp("```✅ Thank you for submitting the suggestion, the suggestion will be reviewed by our Development team asap.```")
            const footerOptions = {
                text: 'Developed by: PGamingHD#0666',
                iconURL: `${modal.user.avatarURL()}`,
            }
            suggestion.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(ee.color)
                    .setTitle(`Suggestion Submitted`)
                    .setDescription(`***Suggestion by:*** ${modal.user}\n\n**Suggestion:**\n\`\`\`${suggested}\`\`\``)
                    .setFooter(footerOptions)
                ]
            })
        }
    } catch (e) {
        console.log(e);
    }
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/