const mongodb = require('../db/connect');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const adminModel = require('../models/admin')
require('dotenv').config()

const configureGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            const existingAdmin = await adminModel.getSingle(mongodb, profile.id);
  
            if (existingAdmin[0]) {
              // Admin already exists, return the admin object
              return done(null, existingAdmin);
            }
  
            // Admin does not exist, create a new admin in the database
            const newAdmin = await adminModel.create(mongodb, {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value
            });

            return done(null, newAdmin);

        } 
        catch (error) {
            return done(error);
        }
      }
    )
  )
}

module.exports = { configureGoogleStrategy };
