
const getAll = async (mongodb) => {
  const result = await mongodb.getDb().collection('admins').find();
  return result.toArray()
}

const getSingle = async (mongodb, userId) => {
  const result = await mongodb
    .getDb()
    .collection('admins')
    .find({ _id: userId });
  return result.toArray()
};

const create = async (mongodb, newAdmin) => {
  const response = await mongodb.getDb()
                              .collection('admins')
                              .insertOne(newAdmin)
  return response
}

module.exports = { 
  getAll, 
  getSingle, 
  create,
};
  
  