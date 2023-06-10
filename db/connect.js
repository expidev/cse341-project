const dotenv = require('dotenv')
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let db;

const connectToDatabase = async () => {
  if (db) {
    console.log("Database is already initialized.")
    return
  }

  // retrieve the config from the .env
  const uri = process.env.DB_URI;
  const dbName = process.env.DB_NAME;


  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    // get access the database name created from mongoDB
    db = client.db(dbName);
    console.log('Connected to the database');

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

function getDb() {
    if (!db) {
      throw new Error('Database connection has not been established.');
    }
    return db;
}


module.exports = {
  connectToDatabase,
  getDb,
};


