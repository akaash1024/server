const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userRoute = require("express").Router();

userRoute.route("/").get((req, res) => {
  res.json({ msg: "Hello World" });
});

userRoute.post("/register", async (req, res) => {
  const { name, age, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const newUser = new User({ name, age, email, pass: hash });
      await newUser.save();
      res.send("User has been saved");
    });
  } catch (error) {
    res.send(error);
  }
});

// !  login
// * http://localhost:3000/api/users/auth

userRoute.post("/auth", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const matchedUser = await User.findOne({ email });
    if (matchedUser) {
      bcrypt.compare(pass, matchedUser.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "BEDC_CAP" }, "masai", {
            expiresIn: 15,
          });
          res.send({ msg: "Login Successfully", token });
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.send(error);
  }
});

// * http://localhost:3000/api/users/movies


userRoute.get("/movies", (req, res) => {
  // *   const { token } = req.query;
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        res.send("Watching the movie");
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("you are not authorized. ..");
  }
});

module.exports = userRoute;
