require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database/db");
const userRoute = require("./routes/user.route");

// ! middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// ! static file path
app.get("/testEJS", (req, res) => {
  res.render("serverEJS.ejs");
});

// * Routes
app.use("/api/users", userRoute);

// ! error handling
app.use((req, res) => {
  const errorPath = path.join(__dirname, "views", "404.html");
  res.sendFile(errorPath);
});

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
});
