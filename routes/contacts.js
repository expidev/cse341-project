const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllUsers);

router.get('/:id', contactsController.getSingleUser);

router.post('/', contactsController.createUser);

router.put('/:id', contactsController.updateUser);

router.delete('/:id', contactsController.deleteUser);

module.exports = router;