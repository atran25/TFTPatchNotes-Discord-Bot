const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const boopEmbed = new MessageEmbed().setTitle('test').setDescription('test2');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with Boop!'),
  async execute(interaction) {
    // await interaction.reply('Boop!');
    await interaction.reply({ embeds: [boopEmbed] });
  },
};
