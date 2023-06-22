const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const usersModel = require('../models/users');

const getAllUsers = async (req, res, next) => {
  const result = await usersModel.getAll(mongodb);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};


const getSingleUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await usersModel.getSingle(mongodb, userId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const createUser = async (req, res, next) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country
  }
  const response = await usersModel.createUser(mongodb, newUser);
  if (response.acknowledged) {
    res.status(201).json({"success" : "successful"})
  } else {
    res.status(500).json(
      response.error || 'An error occured while inserting the user.'
    )
  }
  
}

const updateUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id)
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country
  }
  const response = await usersModel.updateUser(mongodb, userId, newUser);
  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(
      response.error || 'An error occured while updating the user'
    )
  }
}


const deleteUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id)
  const response = await usersModel.deleteUser(mongodb, userId);
  if (response.deletedCount > 0) {
    res.status(204).json({"success": "The user was deleted successfully"})
  } else {
    res.status(500).json(response.error || 'An error occured when removing the user')
  }
}


module.exports = { 
  getAllUsers, 
  getSingleUser, 
  createUser, 
  updateUser, 
  deleteUser
};

