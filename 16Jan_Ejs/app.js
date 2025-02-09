const { router } = require("./routes/ejs.route");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

// ! app.get("/", (req, res) => {
// !   const homepage = path.join(__dirname, "public", "index.html");
// !   res.sendFile(homepage);
// ! });

// ?????????????????????????????? EJS ???????????????????????????????? //

app.set("view engine", "ejs");

const studentsData = [
  { name: "Aarav", grade: "10th" },
  { name: "Ishita", grade: "9th" },
  { name: "Rohan", grade: "8th" },
  { name: "Meera", grade: "10th" },
  { name: "Kabir", grade: "11th" },
];
app.get("/", (req, res)=>{
  res.render("report", { student: studentsData });
})


app.use((req, res)=>{
  res.sendFile(path.join(__dirname, "views", "404.html"))
})


app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}/`);
});
