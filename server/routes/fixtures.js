const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM fixtures;');
    res.json(data.rows);
  });

  router.put('/', async (req, res) => {
    const { selectedDivision, homeTeam, awayTeam, e2eId, date } = req.body;
    const data = await db.query('INSERT INTO fixtures (e2e_id, division, home_team_id, away_team_id, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [e2eId, selectedDivision, homeTeam, awayTeam, date]);
    res.status(201).json(data.rows[0]);
  });

  return router;
};