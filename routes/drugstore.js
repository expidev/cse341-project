const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/drugstores');

router.get('/', contactsController.getAllDrugstores);

router.get('/:id', contactsController.getSingleDrugstore);

router.post('/', contactsController.createDrugstore);

router.put('/:id', contactsController.updateDrugstore);

router.delete('/:id', contactsController.deleteDrugstore);

module.exports = router;