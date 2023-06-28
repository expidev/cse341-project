const passport = require('passport');

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
      passport.authenticate('google', async (err, user) => {
        try {
          if (err) {
            console.error('Error while handling Google callback:', err);
            return res.status(500).json({ error: err.message });
          }
  
          if (!user) {
            console.log('No user received from Google.');
            return res.status(401).json({ message: 'Authentication failed' });
          }

          const existingUser = await userModel.find(user.id);
  
          if (existingUser) {
            return res.status(200).json({ message: 'User already exists' });
          }
  
          const newUser = await userModel.create(
            user.id,
            user.name.givenName,
            user.name.familyName,
            user.emails[0].value
          )
  
          return res.status(200).json(newUser);
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
