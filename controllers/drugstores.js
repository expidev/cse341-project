const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const drugstoresModel = require('../models/drugstores');

const getAllDrugstores = async (req, res, next) => {
  try {
    const result = await drugstoresModel.getAllDrugstores(mongodb);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } 
  catch(err) {
    res.status(500).json(err || "There is an error while retrieving the drugstores list")
  }
  
};


const getSingleDrugstore = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid drugstore id to find a drugstore.')
    }
    const drugstoreId = new ObjectId(req.params.id);
    const result = await drugstoresModel.getSingleDrugstore(mongodb, drugstoreId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  }
  catch(err) {
    res.status(500).json(err.message || "An error occured while retrieving the drugstore.")
  }
  
}

const createDrugstore = async (req, res, next) => {
  try {
    const newDrugstore = {
      name: req.body.name,
      telephone: req.body.telephone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country
    }
    const response = await drugstoresModel.createDrugstore(mongodb, newDrugstore);
    if (response.acknowledged) {
      res.status(201).json({"success" : "successful"})
    } else {
      res.status(500).json(
        response.error || 'An error occured while inserting the drugstore.'
      )
    }
  }
  catch(err) {
    res.status(500).json(err.message || "There's an error while inserting the drugstore.")
  }
  
}

const updateDrugstore = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid drugstore id to update the drugstore.')
    }
    const drugstoreId = new ObjectId(req.params.id)
    const newDrugstore = {
      name: req.body.name,
      telephone: req.body.telephone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country
    }
    const response = await drugstoresModel.updateDrugstore(mongodb, drugstoreId, newDrugstore)
    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(
        response.error || 'An error occured while updating the drugstore'
      )
    }
  }
  catch(err) {
    res.status(500).json(err.message || 'An error occured while updating the drugstore')
  }
}


const deleteDrugstore = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid drugstore id to delete the drugstore.')
    }
    const drugstoreId = new ObjectId(req.params.id)
    const response = await drugstoresModel.deleteDrugstore(mongodb, drugstoreId)
    if (response.deletedCount > 0) {
      res.status(204).json({"success": "The drugstore was deleted successfully"})
    } else {
      res.status(500).json(response.error || 'An error occured when removing the drugstore')
    }
  }
  catch(err) {
    res.status(500).json(err.message || 'An error occured when removing the drugstore.')
  }
  
}


module.exports = { 
  getAllDrugstores, 
  getSingleDrugstore, 
  createDrugstore, 
  updateDrugstore, 
  deleteDrugstore
}

