const fs = require("fs");

const loggerMiddleware = (req, res, next) => {
  const logEntry = `Time: ${new Date().toLocaleString()} | Route: ${req.url} | Method: ${req.method}\n`;
  
  // Append log to file
  fs.appendFile("data.txt", logEntry, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });

  console.log(logEntry.trim());
  next();
};


module.exports = { loggerMiddleware };




