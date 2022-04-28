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
    try {
      const { data } = await axios(rosterUrl);
      const $ = cheerio.load(data);
      let content = [];
  
      $('tbody[id="rosterListingTableBodyPlayer"] > tr').each(function () {
        let name = $(this).find('td[class="name"] > a').text();
        content.push(name)
      })
      res.status(200).json(content);
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  });
  return router;
};