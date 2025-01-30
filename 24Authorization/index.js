const express = require("express");
const { connectDB } = require("./db");
const { UserModel } = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("./middlewares/auth.middleware");
const { rbac } = require("./middlewares/rbac.middleware");

const PORT = 3000;
const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, pass, role } = req.body;
  try {
    bcrypt.hash(pass, 6, async (err, hash) => {
      if (err) {
        res.json({ err });
      }
      const newUser = new UserModel({
        name,
        email,
        role,
        pass: hash,
      });
      await newUser.save();
      res.json({ msg: "New User has been added" });
    });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/auth", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const matchingUser = await UserModel.findOne({ email });
    if (matchingUser) {
      bcrypt.compare(pass, matchingUser.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: matchingUser._id }, "masai");
          res.json({ msg: "Login Successfully", token });
        } else {
          res.json({ msg: "Wrong Credentials", err });
        }
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.get("/movies", auth, rbac(["admin", "user"]), (req, res) => {
  res.json({ msg: "Watching movie.. ." });
});

app.get("/series", auth, rbac(["admin", "user"]), (req, res) => {
  res.json({ msg: "Watching series.. ." });
});
app.get("/userData", auth, rbac(["admin"]), (req, res) => {
  res.json({ msg: "accessing netflix user data.. ." });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at https://localhost:${PORT}`);
});
