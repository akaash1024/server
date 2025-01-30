const mongoose = require("mongoose");

const connection = (uri) => mongoose.connect(uri);

// !  Add this to your MongoDB connection code
// need to check statuc while checking db  
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = connection;
