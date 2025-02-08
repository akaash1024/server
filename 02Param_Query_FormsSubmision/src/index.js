const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// ! error page handle  // must be at end
app.use((req, res) => {
  // ? return res.status(404).send("Page not found")
  const filePath = path.join(__dirname, "..", "views", "404.html");
  return res.status(404).sendFile(filePath);
});

app.listen(3000, () => {
  console.log(`⚙️ Server is listening at 3000`);
});
