const { drugstoreRules, validateDrugstore } = require("../utilities/drugstoreValidation")
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/drugstores');

router.get('/', contactsController.getAllDrugstores);

router.get('/:id', contactsController.getSingleDrugstore);

router.post('/', 
    drugstoreRules(),
    validateDrugstore,    
    contactsController.createDrugstore
);

router.put('/:id', 
    drugstoreRules(),
    validateDrugstore,
    contactsController.updateDrugstore
);

router.delete('/:id', contactsController.deleteDrugstore);

module.exports = router;