const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/login', authController.authenticateWithGoogle);

router.get('/google/callback', 
    authController.handleGoogleCallback
);

router.get('/logout', (req, res, next) => {
    res.clearCookie('jwt')
    delete res.locals.loggedin
    delete res.locals.newAdmin
    res.redirect('/')
})
 
module.exports = router;