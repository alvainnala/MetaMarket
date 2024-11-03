require('dotenv').config();
const mongoose = require('mongoose');
const databaseConnectionString = process.env.DB_CONNECTION_STRING;

const establishDatabaseConnection = async () => {
  try {
    await mongoose.connect(databaseConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Failed to establish database connection', error);
    process.exit(1); 
  }
};

module.exports = establishDatabaseConnection;