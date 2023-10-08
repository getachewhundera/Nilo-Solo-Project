DROP TABLE IF EXISTS "image";
DROP TABLE IF EXISTS "user";
 
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "image" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (500),
    "image_path" VARCHAR (250),
    "owner_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL
);

INSERT INTO "user"
  ("username", "password")
  VALUES
  ('matt', '$2a$10$/KtP6uAI0ivyps7D2aVIRuejSLVE9sFHqpvqnGoMz2kYg3/gSXYIS'); --password: 123

INSERT INTO "image"
  ("description", "image_path", "owner_id")
  VALUES
  ('Blue Gitane Tour de France', 'hhttps://res.cloudinary.com/midaircloud/image/upload/v1640120563/testing/vsbtqbhno7tky8k7orig.jpg', 1);