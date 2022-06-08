DROP TABLE IF EXISTS divisions CASCADE;
CREATE TABLE divisions (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP default now(),
  updated_at TIMESTAMP default now(),
  abbreviation VARCHAR(255) NOT NULL
);