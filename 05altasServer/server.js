require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
});
