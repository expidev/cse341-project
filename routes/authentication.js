const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.authenticateWithGoogle);

router.get('/google/callback', authController.handleGoogleCallback);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        res.redirect('/')
    })
})
 
module.exports = router;