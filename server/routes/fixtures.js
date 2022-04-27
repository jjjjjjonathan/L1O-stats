const express = require('express');
const router = express.Router();
const Jimp = require('jimp');
const fs = require('fs');
const multer = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });

module.exports = db => {
  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM fixtures;');
    res.json(data.rows);
  });

  router.put('/graphics', async (req, res) => {
    const { Base64 } = req.body;

    const splitted = Base64.split(',');

    const buffer = Buffer.from(splitted[1], "base64");
    Jimp.read(buffer)
      .then(image => {
        console.log('success', image);
      })
      .catch(err => {
        console.error(err);
      });

    res.json(Base64);
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