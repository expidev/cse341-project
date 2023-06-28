const express = require('express');
const router = express.Router();

router.get('/auth/google', authController.authenticate);

router.get('/auth/google/callback', authController.signUp);

module.exports = router;