const contactForm = require("../controllers/contact.controller");

const router = require("express").Router();

router.route("/").get((req, res)=>{
    res.json({message: "Hello From contact form"})
});
router.route("/contact").post(contactForm);

module.exports = router;
