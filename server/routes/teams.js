const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', (req, res) => {
    return db.query('SELECT * FROM teams;')
      .then(data => {
        res.json(data.rows);
      });
  });
  return router;
};