DROP TABLE IF EXISTS divisions CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS fixtures CASCADE;

CREATE TABLE divisions (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP default now(),
  updated_at TIMESTAMP default now(),
  abbreviation VARCHAR(255) NOT NULL
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  mens BOOLEAN NOT NULL,
  womens BOOLEAN NOT NULL,
  mens_roster_url TEXT,
  womens_roster_url TEXT,
  graphic_colour VARCHAR(255) NOT NULL,
  created_at TIMESTAMP default now(),
  updated_at TIMESTAMP default now(),
  img VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(6) NOT NULL
);

CREATE TABLE fixtures (
  id SERIAL PRIMARY KEY NOT NULL,
  e2e_id INTEGER NOT NULL,
  division INTEGER REFERENCES divisions(id) ON DELETE CASCADE NOT NULL,
  home_team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  away_team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  home_goals INTEGER DEFAULT 0,
  away_goals INTEGER DEFAULT 0,
  home_total_shots INTEGER DEFAULT 0,
  away_total_shots INTEGER DEFAULT 0,
  home_on_target INTEGER DEFAULT 0,
  away_on_target INTEGER DEFAULT 0,
  home_corners INTEGER DEFAULT 0,
  away_corners INTEGER DEFAULT 0,
  home_offsides INTEGER DEFAULT 0,
  away_offsides INTEGER DEFAULT 0,
  home_fouls INTEGER DEFAULT 0,
  away_fouls INTEGER DEFAULT 0,
  home_yellows INTEGER DEFAULT 0,
  away_yellows INTEGER DEFAULT 0,
  home_reds INTEGER DEFAULT 0,
  away_reds INTEGER DEFAULT 0,
  created_at TIMESTAMP default now(),
  updated_at TIMESTAMP default now(),
  date TIMESTAMP
);