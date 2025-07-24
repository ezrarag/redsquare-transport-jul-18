-- Cities table for autocomplete
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state VARCHAR(2),
  available BOOLEAN DEFAULT TRUE
); 