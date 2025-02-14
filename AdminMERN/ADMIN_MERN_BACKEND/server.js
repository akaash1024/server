require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./router/auth.router");
const contactRoute = require("./router/contact.router");
const serviceRoute = require("./router/service.router");
const adminRoute = require("./router/admin.router");
const connectDatabase = require("./database/db");
const { ApiError } = require("./utils/ApiError");

const path = require("path");

//! cors part
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs")

// ! static file for checking is server working properly or what
const staticFilePath = path.join(__dirname, "public");
app.use(express.static(staticFilePath));


app.use("/report", (req, res)=>{
  res.render("report")
})

// ! routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRoute);

// ! hadnling error part
app.use(ApiError);

// ! server
const PORT = process.env.PORT;
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`⚙️ Server is listening at http://localhost:${PORT}/`);
  });
});
