const passport = require('passport');
const mongodb = require('../db/connect');
const adminModel = require('../models/admin');

const authenticateWithGoogle = async (req, res, next) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }
    catch(err) {
        res.status(500).json(err || "There is an error while authenticating with google")
    }
}

const handleGoogleCallback = async (req, res, next) => {
    try {
      passport.authenticate('google', { session: false }, (err, user) => {
        if (err) {
          console.error('Error while handling Google callback:', err);
          return res.status(500).json({ error: err.message });
        }
  
        if (!user) {
          console.log('No user received from Google.');
          return res.status(401).json({ message: 'Authentication failed' });
        }
  
        req.session.user = user;
        res.redirect('/');
      })(req, res, next);
    } catch (err) {
      console.error('Error while handling Google callback:', err.message);
      return res.status(500).json({ error: err.message || 'An error occurred' });
    }
};
  
  



module.exports = {
  authenticateWithGoogle,
  handleGoogleCallback,
};
