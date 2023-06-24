const express = require('express');
const { userRules, validateUser} = require('../utilities/userValidation')
const router = express.Router();

const contactsController = require('../controllers/users');

router.get('/', contactsController.getAllUsers);

router.get('/:id', contactsController.getSingleUser);

router.post('/', 
    userRules(), 
    validateUser,
    contactsController.createUser
);

router.put('/:id', 
    userRules(),
    validateUser,
    contactsController.updateUser
);

router.delete('/:id', contactsController.deleteUser);

module.exports = router;