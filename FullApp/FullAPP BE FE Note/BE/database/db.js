const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect Database", error.messagep);
  }
};

module.exports = connectDB;
