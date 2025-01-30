const express = require("express");
const { loggerMiddleware } = require("./middleware/middleware");
const fs = require("fs/promises");
const path = require("path");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

// console.log(Object.keys(express));
// console.log(Object.keys(app));

const filePath = path.join(__dirname, "db.json");

// Utility function to read/write `db.json`
const readDb = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // If file doesn't exist, create it with empty students array
      const initialData = { students: [] };
      await writeDb(initialData);
      return initialData;
    }
    throw err;
  }
};

const writeDb = async (data) => {
  await fs.writeFile("./db.json", JSON.stringify(data, null, 2));
};

// Middleware to validate user data
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: `Name and email are required.. .` });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Welcome to the Homepage!");
});

app.get("/users", async (req, res, ) => {
  try {
    const db = await readDV();
    res.json(db.students);
  } catch (error) {
    
    next(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const db = await readDb();
    const user = db.students.find(
      (student) => student.id === parseInt(req.params.id)
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
});

app.post("/users", validateUser, async (req, res) => {
  try {
    const db = await readDb();
    const newUser = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.students.push(newUser);

    await writeDb(db);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error saving user" });
  }
});

// UPDATE - Update user by ID
app.put("/users/:id", validateUser, async (req, res) => {
  try {
    const db = await readDb();
    const userIndex = db.students.findIndex(
      (student) => student.id === parseInt(req.params.id)
    );
    console.log(userIndex);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = {
      ...db.students[userIndex],
      ...req.body,
      id: parseInt(req.params.id),
      updatedAt: new Date().toISOString(),
    };

    db.students[userIndex] = updatedUser;
    await writeDb(db);

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const db = await readDb();
    const userIndex = db.students.findIndex(
      (student) => student.id === parseInt(req.params.id)
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    db.students.splice(userIndex, 1);
    await writeDb(db);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
