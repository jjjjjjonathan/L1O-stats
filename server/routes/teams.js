const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = db => {

  router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM teams ORDER BY teams.name;');
    res.json(data.rows);
  });

  router.put('/players', async (req, res) => {
    const { rosterUrl } = req.body;
    const { data } = await axios(rosterUrl);
    const $ = cheerio.load(data);
    let content = [];
    $('div[class="tooltip-outer rosterTooltip"]').each(function () {
      let name = $(this).find('div > h3').text();
      content.push(name);
    });
    res.status(200).json(content);
  });
  return router;
};