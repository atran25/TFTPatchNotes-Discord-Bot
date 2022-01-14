const patchNotes = require('../tft-scrape/patchNotes');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('highlight')
    .setDescription('Shows latest patch highlight'),
  async execute(interaction) {
    const getHighlight = patchNotes.loadPatchNote();
    const highlight = getHighlight.then(
      async ({ patchNotesInfo, newestPatchNote, baseUrl }) => {
        const highlightEmbed = new MessageEmbed().setImage(patchNotesInfo);
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setLabel('Link to Patch Notes')
            .setURL(`${baseUrl}${newestPatchNote}`)
        );
        await interaction.reply({
          embeds: [highlightEmbed],
          components: [row],
        });
      }
    );
  },
};
