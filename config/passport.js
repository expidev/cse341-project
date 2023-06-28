const GoogleStrategy = require('passport-google-oauth20').Strategy;
const adminModel = require('../models/admin')
require('dotenv').config()

const configureGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        try {
            // Check if the admin already exists in the database
            const existingAdmin = await adminModel.getSingle(mongodb, profile.id);
  
            if (existingAdmin) {
              // Admin already exists, return the admin object
              return done(null, existingAdmin);
            }
  
            // Admin does not exist, create a new admin in the database
            const newAdmin = await adminModel.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
            });
  
            return done(null, newAdmin);
          } catch (error) {
            return done(error);
          }
        return done(null, profile);
      }
    )
  );
};

module.exports = configureGoogleStrategy;
