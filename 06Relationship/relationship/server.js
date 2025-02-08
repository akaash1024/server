require("dotenv").config()
const express = require("express");
const connectDB = require("./database/db");
const app = express();
const path = require("path");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.route");
const orderRouter = require("./routes/order.route");



// ! middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const staticRoute = path.join(__dirname, "..", "public");
app.use(express.static(staticRoute));


// ? Router
app.use("/api/user", userRouter)
app.use("/api/profile", profileRouter)
app.use("/api/order", orderRouter)



// ! error route
app.use((req, res) => {
  // console.log("with ..",path.join(__dirname,  "views","..", "404.html"));
  // console.log("with ..",path.join(__dirname,  "..", "views", "404.html"));
  // console.log( "without ..",path.join(__dirname, "views", "404.html"));
  
  const filePath = path.join(__dirname, "views", "404.html");
  return res.status(404).sendFile(filePath); 
});



// * connection dabase

const PORT = process.env.PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
});
