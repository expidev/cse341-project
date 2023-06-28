const passport = require('passport');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const adminModel = require('../models/admin');

const authenticateWithGoogle = async (req, res, next) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] });
    }
    catch(err) {
        res.status(500).json(err || "There is an error while authenticating with google")
    }
}

const handleGoogleCallback = async (req, res, next) => {
    try {
      passport.authenticate('google', async (err, admin) => {
        try {
          if (err) {
            console.error('Error while handling Google callback:', err);
            return res.status(500).json({ error: err.message });
          }
  
          if (!admin) {
            console.log('No admin received from Google.');
            return res.status(401).json({ message: 'Authentication failed' });
          }

          const existingAdmin = await adminModel.getSingle(mongodb, admin.id);
  
          if (existingAdmin) {
            return res.status(200).json({ message: 'Admin already exists' });
          }
  
          const newAdmin = await adminModel.create(mongodb,
            {
                googleId: admin.id,
                firstName: admin.name.givenName,
                lastName: admin.name.familyName,
                email: admin.emails[0].value
            } 
          )
  
          return res.status(200).json(newAdmin);
        } catch (error) {
          console.error('Error while handling Google callback:', error);
          return res.status(500).json({ error: err.message});
        }
      })(req, res, next);

    } catch (error) {
      console.error('Error while handling Google callback:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  };
  



module.exports = {
  authenticateWithGoogle,
  handleGoogleCallback,
};
