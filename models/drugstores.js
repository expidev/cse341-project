
const getAllDrugstores = async (mongodb) => {
  const result = await mongodb.getDb().collection('drugstores').find();
  return result.toArray()
};


const getSingleDrugstore = async (mongodb, drugstoreId) => {
  const result = await mongodb
    .getDb()
    .collection('drugstores')
    .find({ _id: drugstoreId });
  return result.toArray()
};

const createDrugstore = async (mongodb, newDrugstore) => {
  const response = await mongodb.getDb()
                              .collection('drugstores')
                              .insertOne(newDrugstore)
  return response
}

const updateDrugstore = async (mongodb, drugstoreId, newDrugstore) => {
  const response = await mongodb.getDb()
                                .collection('drugstores')
                                .replaceOne(
                                    {_id: drugstoreId},
                                    newDrugstore
                                  )

  return response
}


const deleteDrugstore = async (mongodb, drugstoreId) => {
  const response = await mongodb.getDb()
                                .collection('drugstores')
                                .deleteOne(
                                    {_id: drugstoreId}
                                )
  return response
}


module.exports = { 
  getAllDrugstores, 
  getSingleDrugstore, 
  createDrugstore, 
  updateDrugstore, 
  deleteDrugstore
};

