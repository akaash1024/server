require("dotenv").config()
const path = require("path")

const express = require("express")
const connectDB = require("./database/db")

const upload = require("./middlewares/multer.middleware")
const app = express()
const registerUser = require("./controller/user.controller")

// ! middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

// ? server home routes
app.get("/", (req, res) => {
  res.render("index");
});




// ! testing multer

app.post("/api/user/register", upload.single("avatar"), registerUser);






app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = process.env.PORT
// connection to server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
  })
})