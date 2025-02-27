require("dotenv").config();
const express = require("express");
const { blueBright } = require("chalk");
const path = require("path");
const { PORT } = require("./env");
const { validation } = require("./middleware/validation");
const { logger } = require("./middleware/logger");

const app = express();
app.use(express.json());
app.use(logger);

// ! updating here
const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));


app.post("/", validation, (req, res) => {
  try {
    console.log("Data received:", req.body);
    console.log("Posted Successfully");

    return res.status(201).json({
      message: "Data posted successfully!",
      data: req.body,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
});

app.listen(PORT, () => {
  console.log(blueBright(`Server is running at http://localhost:${PORT}`));
});
