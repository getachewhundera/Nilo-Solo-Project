
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--Changed username character count to 255
-- added firstname and lastname to table 
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR (1000) NOT NULL,
    "lastname" VARCHAR (1000) NOT NULL, 
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE uploadpost(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    file_url TEXT NOT NULL, 
    description TEXT NOT NULL, 
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    price NUMERIC(14, 2), 
    rating INTEGER NOT NULL
);


-- CREATE TABLE uploadpost(
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES "user"(id),
--     file_url TEXT NOT NULL, 
--     description TEXT NOT NULL, 
--     house_number TEXT, 
--     street_address TEXT, 
--     zip_code TEXT, 
--     city TEXT NOT NULL,
--     state TEXT NOT NULL,
--     country TEXT NOT NULL,
--     price NUMERIC(14, 2), 
--     rating INTEGER NOT NULL, 
--     individual_selection TEXT CHECK (individual_selection IN ('Solo', 'Group'))
-- );


CREATE TABLE list(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id),
  description TEXT,
  date DATE, 
  is_completed BOOLEAN DEFAULT false
);