

require("dotenv").config();

const express = require("express");

const connectDB = require("./db/connectDB");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const orderRouter = require("./routes/order.routes");

const app = express();

// ! middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/user", userRouter)
app.use("/api/profile", profileRouter)
app.use("/api/order", orderRouter)


const PORT = process.env.PORT
connectDB().then(
    () => {
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        });
    }
)

