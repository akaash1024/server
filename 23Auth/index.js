const express = require("express");
const { connectDB } = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("./models/user.model");

const PORT = 3000;

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, age, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const newUser = new UserModel({ name, age, email, pass: hash });
      await newUser.save();
      res.send("User has been saved");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/auth", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const matchedUser = await UserModel.findOne({ email });
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

// * http://localhost:3000/movies?token=fsdjafsd-asdfsdaj-dfsdkj

app.get("/movies", (req, res) => {
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

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at ${PORT}`);
});
