const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const studentRouter = express.Router();

studentRouter.get("/", async (req, res) => {
  try {
    const dbFilePath = path.join(__dirname, "..", "db.json");
    const data = await fs.readFile(dbFilePath, "utf-8");
    const parseData = JSON.parse(data);
    res.send({ students: parseData.students });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { studentRouter };
