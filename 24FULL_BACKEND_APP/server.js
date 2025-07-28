require("dotenv").config();

const express = require("express");
const connectDB = require("./database/connectDB");
const errorHandler = require("./utils/errorHandler");
const authRoute = require("./route/auth.route");
const cors = require("cors");
const helmet = require("helmet");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");



const app = express();

// Middlewares
app.use(cors());
app.use(helmet());

app.use(cookieParser());

app.use(morgan("dev"));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Routes
app.use("/api/auth", authRoute);



// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
console.log("PORT:", PORT);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`⚙️ Server is running at http://localhost:${PORT}/`);
  });
});
