const { router } = require("./routes/ejs.route");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  const homepage = path.join(__dirname, "public", "index.html");
  res.sendFile(homepage);
});

app.set("view engine", "ejs");


app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
