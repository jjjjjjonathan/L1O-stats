// Load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./db');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Separated routes
const divisionRoutes = require('./routes/divisions');

// Mount all resource routes and pass in db
app.use('/api/divisions', divisionRoutes(db));

app.get('/', (req, res) => {
  res.send("home");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});