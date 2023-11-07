const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// for file upload 
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- MIDDLEWARE --------- //
//Accept file uploads 
app.use(fileUpload()); //similar to bodyparser.json 

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Route includes
const userRouter = require('./routes/user.router');
const uploadRouter = require('./routes/upload.router'); 
const listRouter = require('./routes/list.router'); 

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter); 
app.use('/api/list', listRouter); 

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5007;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
