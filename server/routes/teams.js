const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const Jimp = require('jimp');
const tinycolor = require('tinycolor2');

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
    const { Base64, updatedXI, teamName, graphicColour } = req.body;
    const splitted = Base64.split(',');
    const buffer = Buffer.from(splitted[1], 'base64');
    let graphicBg = await Jimp.read(buffer);
    const teamColor = tinycolor(graphicColour);
    const white = tinycolor('#FFFFFF');
    const font = tinycolor.isReadable(teamColor, white, { level: 'AA', size: 'small' }) ? await Jimp.loadFont(
      './public/fonts/oswaldLineup/oswaldRegularWhite.fnt'
    ) : await Jimp.loadFont('./public/fonts/oswaldLineup/oswaldRegularBlack.fnt');
    let altText = `Starting eleven for ${teamName}. `;
    let altTextArray = [];
    let yAxisNumCounter = 0;
    const mappedXI = updatedXI.map((player) =>
      player.isGoalkeeper ? { ...player, name: `${player.name} (GK)` } : player
    );
    let longestName = 0;
    let longestNum = 0;
    mappedXI.forEach((player) => {
      let nameLength = Jimp.measureText(font, player.name);
      if (nameLength > longestName) {
        longestName = nameLength;
      }
      let numLength = Jimp.measureText(font, player.number.toString(10));
      if (numLength > longestNum) {
        longestNum = numLength;
      }
    });

    let playerNums = new Jimp(
      longestNum,
      800,
      0xffffff00,
      (err, playerNums) => {
        if (err) throw err;
      }
    );

    let playerNames = new Jimp(
      longestName,
      900,
      0xffffff00,
      (err, playerNames) => {
        if (err) throw err;
      }
    );

    let image = new Jimp(
      longestName + longestNum + 50,
      800,
      0xffffff00,
      (err, image) => {
        if (err) throw err;
      }
    );
    updatedXI.forEach((player) => {
      playerNums.print(
        font,
        0,
        yAxisNumCounter,
        {
          text: player.number.toString(10),
          alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP
        },
        longestNum,
        800
      );

      playerNames.print(
        font,
        0,
        yAxisNumCounter,
        {
          text: player.isGoalkeeper ? `${player.name} (GK)` : player.name,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP
        },
        longestName,
        1000
      );

      yAxisNumCounter += 62;
      altTextArray.push(`${player.number.toString(10)}, ${player.name}`);
    });

    image.composite(playerNums, 0, 0);
    image.composite(playerNames, longestNum + 50, 0);
    image.contain(
      1620,
      800,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    );
    graphicBg.composite(image, 0, 555);

    const newBase64 = await graphicBg.getBase64Async(Jimp.AUTO);

    altText += `${altTextArray.join('. ')}.`;

    res.json({ newBase64, altText });
  });
  return router;
};
