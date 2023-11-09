# Project Name: Nilo 

## Duration: Three week sprint 

## Description
Nilo is a platform that allows you to create personal privatized posts logging your life experiences with photos and descriptions. Along with tracking your bucket list aspirations, and watching as each experience pins itself on your interactive map. Nilo motivates you with counters that tally both your solo journeys and overall experiences. 

## Design
Figma- Application Flowcharting and wireframes
dbdiagram.io - Used for database relationship diagrams
Google Docs - Scope documentation 

## Features
- Home: users feed that displays uploades posts of there experiences/activites they have done. 
- SnapShot: Users can upload a post that inludes an image and a narrative of the experience (description, place(city,state,country), price, and rating)
- Users can Delete added posts off there home feed where the uploaded posts are displayed. 
- Add Goal: Add a bucket list goal. 
- Goal Gallery: Displays Bucket List
- Options to Edit, delete, and add goals. 

## Technologies Used
Amazon Web Services (Amazon S3)
JavaScript
React
Redux
Saga
Passport
Node.js
Express
PostgreSQL
Material UI
CSS

## Prerequisites 
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/) 
- [PostrgeSQL](https://www.postgresql.org/) 
- [Nodemon](https://nodemon.io/)  

## Dependencies installed
npm install

## Setup and Installation
- Create a database using the provided database.sql file, title the DB 'solo_project_prime' or change database name and update it in pool.js file in modules folder. 
- Run the queries in the included database.sql file
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
- Replace `superDuperSecret` with stronger string for application security. Site that can possibly help with string generation: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning in server termianl.
- Can be done later (when ready to start uploading files). If using AWS (amazon s3) add and paste these lines into the `.env`file you had already created. 
```
AWS_REGION=
AWS_SECRET_ACESS_KEY=
AWS_ACESS_KEY_ID=
```
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm install` from the project root directory
- Run `npm run server` to run the node server
- In a separate terminal tab, run `npm run client` to launch the React app
- Navigate to `localhost:3000`

## Testing Routes with Postman
To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build
Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment
1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
7. In the deploy section, select manual deploy



## Acknowledgement
- Prime Digital Academy Instructors/Team
- Tourmaline cohortmates



## Wireframes 