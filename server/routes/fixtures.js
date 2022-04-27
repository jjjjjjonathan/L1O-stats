const express = require('express');
const router = express.Router();
const Jimp = require('jimp');

module.exports = db => {
  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM fixtures;');
    res.json(data.rows);
  });

  router.put('/graphics', async (req, res) => {
    const { Base64, text, hScore, aScore } = req.body;
    const splitted = Base64.split(',');
    const buffer = Buffer.from(splitted[1], "base64");

    let image = await Jimp.read(buffer);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    image.print(font, 0, -400, {
      text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 1620, 1620);
    image.print(font, -305, 350, {
      text: hScore,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 1620, 1620);
    image.print(font, 305, 350, {
      text: aScore,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 1620, 1620);
    const newBase64 = await image.getBase64Async(Jimp.AUTO);

    res.json(newBase64);
  });

  router.put('/', async (req, res) => {
    const { selectedDivision, homeTeam, awayTeam, e2eId, date } = req.body;
    const data = await db.query('INSERT INTO fixtures (e2e_id, division, home_team_id, away_team_id, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [e2eId, selectedDivision, homeTeam, awayTeam, date]);
    res.status(201).json(data.rows[0]);
  });

  router.post('/', async (req, res) => {
    const { stat, value, fixtureId } = req.body;
    const data = await db.query(`UPDATE fixtures SET ${stat} = $1 WHERE id = $2 RETURNING *;`, [value, fixtureId]);
    res.status(200).json(data.rows[0]);
  });

  return router;
};