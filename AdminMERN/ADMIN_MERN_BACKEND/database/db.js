require("dotenv").config();

const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to eastblish Database connection", error.message);
    process.exit(0);
  }
};

module.exports = connectDatabase;
