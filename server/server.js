const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// for file upload 
const fileUpload = require('express-fileupload');

// Route includes
const userRouter = require('./routes/user.router');
const uploadRouter = require('./routes/upload.router'); 
const listRouter = require('./routes/list.router'); 

// ----------- MIDDLEWARE --------- //
//Accept file uploads 
app.use(fileUpload()); //similar to bodyparser.json 

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter); 
app.use('/api/list', listRouter); 
app.use('/api/images', uploadRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5007;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
