require("dotenv").config();

const mongoose = require("mongoose");

const URL = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log(`Connected to database`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
