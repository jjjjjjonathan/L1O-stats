const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const Jimp = require('jimp');

module.exports = (db) => {
  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM teams ORDER BY teams.name;');
    res.json(data.rows);
  });

  router.put('/players', async (req, res) => {
    const { rosterUrl } = req.body;
    try {
      const { data } = await axios(rosterUrl);
      const $ = cheerio.load(data);
      let content = [];
      $('tbody[id="rosterListingTableBodyPlayer"] > tr').each(function (id) {
        let name = $(this).find('td[class="name"] > a').text();
        content.push({
          name: name.replace(/^\d[^A-Za-z]*/, ''),
          number: 0,
          isGoalkeeper: false,
          isCaptain: false,
          id
        });
      });
      res.status(200).json(content);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });

  router.put('/lineup', async (req, res) => {
    const { Base64, updatedXI, teamName } = req.body;
    const splitted = Base64.split(',');
    const buffer = Buffer.from(splitted[1], 'base64');
    let image = await Jimp.read(buffer);
    const font = await Jimp.loadFont(
      './public/fonts/oswaldLineup/oswaldXI.fnt'
    );
    let altText = `Starting eleven for ${teamName}. `;
    let altTextArray = [];
    let yAxisNumCounter = -222;
    updatedXI.forEach((player) => {
      image.print(
        font,
        -950,
        yAxisNumCounter,
        {
          text: player.number.toString(10),
          alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        1620,
        1620
      );

      image.print(
        font,
        725,
        yAxisNumCounter,
        {
          text: player.isGoalkeeper ? `${player.name} (GK)` : player.name,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        1620,
        1620
      );

      yAxisNumCounter += 62;
      altTextArray.push(`${player.number.toString(10)}, ${player.name}`);
    });

    const newBase64 = await image.getBase64Async(Jimp.AUTO);

    altText += `${altTextArray.join('. ')}.`;

    res.json({ newBase64, altText });
  });
  return router;
};
