const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://manu:manu@cluster0.i3y2h.mongodb.net/authCAP?retryWrites=true&w=majority&appName=Cluster0"
    ); 
    console.log(`Connected to Atlas database`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
