const express = require('express');
const { isAuthenticated } = require('../utilities/authenticate')
const { userRules, validateUser} = require('../utilities/userValidation')
const router = express.Router();

const contactsController = require('../controllers/users');

router.get('/', contactsController.getAllUsers);

router.get('/:id', contactsController.getSingleUser);

router.post('/', 
    isAuthenticated,
    userRules(), 
    validateUser,
    contactsController.createUser
);

router.put('/:id', 
    isAuthenticated,
    userRules(),
    validateUser,
    contactsController.updateUser
);

router.delete('/:id', isAuthenticated, contactsController.deleteUser);

module.exports = router;