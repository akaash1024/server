
require("dotenv").config({ path: "../.env" });


const express = require("express");
const app = express();

const { connectDB } = require("./db/index");


const connectServer = async () => {
  try {
    await connectDB(); 
    
    app.on("error", (error) => { 
      console.log("ERROR: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("MONGO db connection failed !!! ", error);
  }
};

connectServer();


/*
// ! with then .catch
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
*/





// ! IIFE
/*
const { DB_NAME } = require("./constants");
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Connected to mongoDB`);

    app.on("errror", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw err;
  }
})();

*/
