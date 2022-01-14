const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const boopEmbed = new MessageEmbed()
  .setTitle('TFTUtils Commands')
  .setDescription("Explanation of how the bot's commands work")
  .setAuthor({
    name: 'Anthony Tran',
    iconURL:
      'https://cdn.discordapp.com/avatars/191467299880828929/9493524d78cfb3dd89593853c3b7e89f.webp?size=128',
    url: 'https://discordapp.com/users/191467299880828929/',
  })
  .setThumbnail(
    'https://cdn.discordapp.com/attachments/885689185376305212/931438455282610206/0wum9ecqxbq41.png'
  )
  .addFields(
    {
      name: '/help',
      value: "Displays the commands aka what you're looking at right now",
    },
    {
      name: '/highlight',
      value: 'Displays the highlight image of the latest TFT patch',
    },
    {
      name: '/changes <input>',
      value:
        'Will search the latest patchnotes for the changes containing the <input> and return them as a list',
    }
  )
  .setTimestamp()
  .setFooter({
    text: 'https://github.com/atran25/TFTPatchNotes-Discord-Bot',
    url: 'https://github.com/atran25/TFTPatchNotes-Discord-Bot',
    iconURL:
      'https://cdn.discordapp.com/avatars/191467299880828929/9493524d78cfb3dd89593853c3b7e89f.webp?size=128',
  });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('lists the commands and what they do'),
  async execute(interaction) {
    // await interaction.reply('Boop!');
    await interaction.reply({ embeds: [boopEmbed] });
  },
};
