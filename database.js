require('dotenv').config();
const mongoose = require('mongoose');
const { DB_CONNECTION_STRING } = process.env;

const establishDatabaseConnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING, {
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