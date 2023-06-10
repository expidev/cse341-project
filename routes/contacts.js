const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllUsers);

router.get('/:id', contactsController.getSingleUser);

module.exports = router;