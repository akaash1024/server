const authController = require("../controller/auth.controller");
const isAuthenicated = require("../middleware/isAuthenicated.middleware");
const isinfoValidate = require("../middleware/isinfoValidate.middleware");

const upload = require("../middleware/multer.middleware");


const { signupSchema, loginSchema } = require("../validator/auth-validation.schema")




const authRoute = require("express").Router()

/* 
authRoute.get("/set-cookie", (req, res) => {
    res.cookie("token", "0rx30pt6jh", {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Cookie has been set" });
});

*/

authRoute.get("/set-cookie", (req, res) => {
    res.cookie("token", "0rx30pt6jh", {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 1000, // 1 minute
    });
    res.send("Cookie set for 1 minute");
});




authRoute.route("/register").post(upload.single("avatar"), isinfoValidate(signupSchema), authController.register);



authRoute.route("/login").post(isinfoValidate(loginSchema), authController.login);

authRoute.route("/user").get(isAuthenicated, authController.user)

authRoute.route("/logout").get(authController.logout);



module.exports = authRoute;