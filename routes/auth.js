const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const data = await db.query('SELECT * FROM users WHERE name = $1;', [name]);
    if (bcrypt.compareSync(password, data.rows[0].password_digest)) {
      res.json(data.rows[0].id);
    }
  });

  router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    const data = await db.query(
      'INSERT INTO users (name, password_digest) VALUES ($1, $2) RETURNING id;',
      [name, bcrypt.hashSync(password, 10)]
    );
    res.json(data.rows[0].id);
  });
};
