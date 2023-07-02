const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { checkJwtToken } = require("./utilities/authenticate")
const passport = require('passport')
const { connectToDatabase } = require("./db/connect")
const { configureGoogleStrategy } = require('./config/passport');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Enable CORS middleware
app.use(cors());

// body parsing
app.use(express.urlencoded({ extended: true }))

// Enable json parsing middleware
app.use(express.json())
app.use(cookieParser())
app.use(checkJwtToken)

app.use(passport.initialize())

configureGoogleStrategy(passport);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/", require("./routes/"));

// Connect to the database
connectToDatabase()
  .then((db) => {
    // Start the server after the database connection is established
    app.listen(port, () => {
      console.log('Server started on port 3000');
    });
  })
  
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

