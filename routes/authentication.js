const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/auth/google', authController.authenticateWithGoogle);

router.get('/auth/google/callback', authController.signUp);

module.exports = router;