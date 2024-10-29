require('dotenv').config();
const mongoose = require('mongoose');
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1); 
  }
};
module.exports = connectToDatabase;