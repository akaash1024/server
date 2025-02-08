require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./database/db");
const userRoute = require("./routes/user.route");
const noteRoute = require("./routes/note.routes");
const app = express();
const cors = require("cors")

// !  middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");


// ! router
app.get("/", (req, res)=>{
  res.render("server")
})

app.use("/api/user", userRoute)
app.use("/api/note", noteRoute)



// !routing  error

app.use((req, res) => {
  const notFoundfilePath= path.join(__dirname, "views", "404.html")
  res.sendFile(notFoundfilePath)
});

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
});
