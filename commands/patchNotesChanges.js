const patchNotes = require('../tft-scrape/patchNotes');
const {
  SlashCommandBuilder,
  codeBlock,
  bold,
  blockQuote,
} = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const voca = require('voca');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changes')
    .setDescription(
      'Showsthe raw balance changes of the latest patch for the keyword input'
    )
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('Keyword to search for')
        .setRequired(true)
    ),
  async execute(interaction) {
    const getChanges = patchNotes.loadPatchNote();
    const changes = getChanges.then(
      async ({ patchNoteChanges, newestPatchNote, baseUrl }) => {
        let patchVersion = newestPatchNote.replace('game-updates/', '');
        patchVersion = patchVersion.replace('/', ' ');

        const keyword = [
          voca.capitalize(interaction.options.getString('input')),
          voca.decapitalize(interaction.options.getString('input')),
        ];
        const filteredPatchChanges = patchNoteChanges.filter(
          (change) => change.includes(keyword[0]) | change.includes(keyword[1])
        );

        // console.log(filteredPatchChanges);
        const changesString = filteredPatchChanges.reduce(
          (currentString, change) => {
            return currentString + change + '\n';
          },
          ''
        );
        // console.log(changesString);

        const result = codeBlock(`${changesString}`);

        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setLabel('Link to Patch Notes')
            .setURL(`${baseUrl}${newestPatchNote}`)
        );

        await interaction.reply({
          content: `${blockQuote(patchVersion)}\nFiltered for keyword: ${bold(
            keyword[1]
          )} / ${bold(keyword[0])}${result}`,
          ephemeral: false,
          components: [row],
        });
      }
    );
  },
};
