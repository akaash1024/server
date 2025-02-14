const Service_Database = require("../models/service.model");

const services = async (req, res, next) => {
  try {
    // !for testing error
    // throw { message: "Akash Error done"}

    const service_data = await Service_Database.find({});
    if (!service_data.length) {
      return res
        .status(404)
        .json({ success: false, message: "No service found" });
    }
    res.status(200).json({ success: true, service_data });
  } catch (error) {
    console.error("Database Error:", error);
    //res.status(500).json({ success: false, error: error.message });
    const status = 550;
    const err = {status}
    next(err);
  }
};

module.exports = services;
