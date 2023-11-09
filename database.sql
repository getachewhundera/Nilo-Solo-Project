-- CREATE DATABASE 'solo_project_prime';    //or change name in the pool.js file

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

CREATE TABLE list(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id),
  description TEXT,
  date DATE, 
  is_completed BOOLEAN DEFAULT false
);