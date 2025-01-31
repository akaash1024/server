const express = require("express");

const app = express();

// Custom error class
class CustomError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statuscode || 500).json({ error: err.message });
});

// Route that throws an error
app.get("/", (req, res, next) => {
    next(new CustomError("Not Found", 401)); // Better way to pass errors to middleware
});

// Start the server
app.listen(3000, () => {
    console.log("Server is listening at http://localhost:3000/");
});
