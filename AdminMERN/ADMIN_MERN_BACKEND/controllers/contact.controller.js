const Contact_Database = require("../models/contact.model");

const contactForm = async (req, res, next) => {
  console.log(req.body);
  try {
    // throw { message: "AKahs COntact error done" };
    const response = req.body;
    console.log(response);
    await Contact_Database.create(response);
    return res
      .status(200)
      .json({ success: true, message: "message send successfully" });
  } catch (error) {
    //return res.status(500).json({success: false,  message: "message not delivered" });

    next(error);
  }
};

module.exports = contactForm;
