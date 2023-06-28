const { drugstoreRules, validateDrugstore } = require("../utilities/drugstoreValidation")
const { isAuthenticated } = require("../utilities/authenticate")
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/drugstores');

router.get('/', contactsController.getAllDrugstores);

router.get('/:id', contactsController.getSingleDrugstore);

router.post('/', 
    isAuthenticated,
    drugstoreRules(),
    validateDrugstore,    
    contactsController.createDrugstore
);

router.put('/:id', 
    isAuthenticated,
    drugstoreRules(),
    validateDrugstore,
    contactsController.updateDrugstore
);

router.delete('/:id', isAuthenticated, contactsController.deleteDrugstore);

module.exports = router;