DROP TABLE IF EXISTS teams CASCADE;
CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  mens BOOLEAN NOT NULL,
  womens BOOLEAN NOT NULL,
  mens_roster_url TEXT,
  womens_roster_url TEXT,
  graphic_colour VARCHAR(255) NOT NULL,
  created_at TIMESTAMP default now(),
  updated_at TIMESTAMP default now()
);