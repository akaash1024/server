
const fs = require("fs/promises");
const path = require("path");

const logger = async (req, res, next) => {
  const logEntry = `Time: ${new Date().toLocaleString()} || Route: ${req.url} || Method: ${req.method}\n\n`;
  const datatxt_FilePath = path.join(__dirname, "..", "data.txt")

  try {
    await fs.appendFile(datatxt_FilePath, logEntry, "utf-8");
    console.log(logEntry.trim());
  } catch (err) {
    console.error(`Failed to write to log file: ${err}`);
  }

  next();
};

module.exports = { logger };
