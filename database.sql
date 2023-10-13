
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