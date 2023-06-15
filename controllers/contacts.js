const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res, next) => {
  const result = await mongodb.getDb().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


const getSingleUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res, next) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb.getDb()
                              .collection('contacts')
                              .insertOne(newUser)
  if (response.acknowledged) {
    res.status(201).send()
  } else {
    res.status(500).json(
      response.error || 'An error occured while inserting the user.'
    )
  }
  
}

const updateUser = async (req, res, next) => {
  const userToUpdateId = new ObjectId(req.params.id)
  const updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb.getDb()
                                .collection('contacts')
                                .replaceOne(
                                    {_id: userToUpdateId},
                                    updatedUser
                                  )
  console.log(response)
  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(
      response.error || 'An error occured while updating the user'
    )
  }
}


const deleteUser = async (req, res, next) => {
  const userToDeleteId = new ObjectId(req.params.id)
  const response = await mongodb.getDb()
                                .collection('contacts')
                                .deleteOne(
                                    {_id: userToDeleteId}
                                )
  console.log(response)
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

