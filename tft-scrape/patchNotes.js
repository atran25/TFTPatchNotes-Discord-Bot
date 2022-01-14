// import axios from "axios";
// import cheerio from cheerio
const axios = require('axios');
const cheerio = require('cheerio');

const getNewestPatchNotes = async () => {
  const url = 'https://teamfighttactics.leagueoflegends.com/en-us/news/';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const categories = $('li.style__Item-sc-1wl8wcx-3');
  const patchNotesNames = [];

  for (let i = 0; i < categories.length; i++) {
    const li = categories[i];
    let patchNotesA = $(li).find('a.style__Wrapper-sc-1gxxcts-0').attr('href');
    if (patchNotesA.includes('patch')) {
      patchNotesA = patchNotesA.replace('/en-us/news/', '');
      patchNotesNames.push(patchNotesA);
    }
  }
  //   console.log(patchNotesNames);
  return patchNotesNames;
};

const getPatchNoteInfo = async (patchNote) => {
  const baseUrl = 'https://teamfighttactics.leagueoflegends.com/en-us/news/';
  const { data } = await axios.get(`${baseUrl}${patchNote}`);
  const $ = cheerio.load(data);
  const patchContent = $('div.content-border');
  let patchSummary;
  for (let i = 0; i < patchContent.length; i++) {
    const div = patchContent[i];
    const patchSummaryTemp = $(div).find('a.skins.cboxElement').attr('href');
    if (patchSummaryTemp) {
      patchSummary = patchSummaryTemp;
    }
  }
  return patchSummary;
};

const loadPatchNote = async () => {
  const baseUrl = 'https://teamfighttactics.leagueoflegends.com/en-us/news/';
  const patchNotesNames = await getNewestPatchNotes();
  const newestPatchNote = patchNotesNames[0];
  const patchNotesInfo = await getPatchNoteInfo(newestPatchNote);
  //   console.log(newestPatchNote, patchNotesInfo);
  return {
    patchNotesInfo,
    newestPatchNote,
    baseUrl,
  };
};

// const highlight = loadPatchNote();
// highlight.then((result) => {
//   console.log(result);
// });

module.exports = {
  loadPatchNote,
};
