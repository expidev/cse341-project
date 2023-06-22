const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const drugstoresModel = require('../models/drugstores');

const getAllDrugstores = async (req, res, next) => {
  const result = await drugstoresModel.getAllDrugstores(mongodb);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};


const getSingleDrugstore = async (req, res, next) => {
  const drugstoreId = new ObjectId(req.params.id);
  const result = await drugstoresModel.getSingleDrugstore(mongodb, drugstoreId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const createDrugstore = async (req, res, next) => {
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
      response.error || 'An error occured while inserting the user.'
    )
  }
}

const updateDrugstore = async (req, res, next) => {
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
      response.error || 'An error occured while updating the user'
    )
  }
}


const deleteDrugstore = async (req, res, next) => {
  const drugstoreId = new ObjectId(req.params.id)
  const response = await drugstoresModel.deleteDrugstore(mongodb, drugstoreId)
  if (response.deletedCount > 0) {
    res.status(204).json({"success": "The user was deleted successfully"})
  } else {
    res.status(500).json(response.error || 'An error occured when removing the user')
  }
}


module.exports = { 
  getAllDrugstores, 
  getSingleDrugstore, 
  createDrugstore, 
  updateDrugstore, 
  deleteDrugstore
};

