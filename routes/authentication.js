const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.authenticateWithGoogle);

router.get('/auth/google/callback', authController.signUp);

router.get('/logout', (res, req, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        res.redirect('/')
    })
})

module.exports = router;