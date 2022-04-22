const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM fixtures;');
    res.json(data.rows);
  });
  return router;
};