
const getAll = async (mongodb) => {
  const result = await mongodb.getDb().collection('users').find();
  return result.toArray()
}

const getSingle = async (mongodb, userId) => {
  const result = await mongodb
    .getDb()
    .collection('users')
    .find({ _id: userId });
  return result.toArray()
};

const createUser = async (mongodb, newUser) => {
  const response = await mongodb.getDb()
                              .collection('users')
                              .insertOne(newUser)
  return response
}

const updateUser = async (mongodb, userId, newUser) => {
  const response = await mongodb.getDb()
                                .collection('users')
                                .replaceOne(
                                    {_id: userId},
                                    newUser
                                  )
  return response
}


const deleteUser = async (mongodb, userId) => {
  const response = await mongodb.getDb()
                                .collection('users')
                                .deleteOne(
                                    {_id: userId}
                                )
  return response
}


module.exports = { 
  getAll, 
  getSingle, 
  createUser, 
  updateUser, 
  deleteUser
};

