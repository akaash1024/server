const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const teacherRouter = express.Router();

const dbFilePath = path.join(__dirname, "..", "db.json");

teacherRouter.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, "utf-8");
    const parseData = JSON.parse(data);
    res.status(200).send({ teachers: parseData.teachers });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

teacherRouter.post("/", async (req, res) => {
  try {
    let data = await fs.readFile(dbFilePath, "utf-8");
    let parseData = JSON.parse(data);
    parseData.teachers.push(req.body);
    await fs.writeFile(dbFilePath, JSON.stringify(parseData, null, 2));
    res.send("The new teacher data has been saved");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = { teacherRouter };
