const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { versionKey: false }
);

// create a model or a collection
const Contact_Database = mongoose.model("Contact_Database", contactSchema);
module.exports = Contact_Database;
