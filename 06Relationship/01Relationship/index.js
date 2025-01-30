const express = require("express");
const { PORT } = require("./env");
const { connectDB } = require("./dbConfig");
const { userRouter } = require("./routes/user.routes");
const { profileRouter } = require("./routes/profile.routes");
const { orderRouter } = require("./routes/order.routes");

const app = express();
app.use(express.json());
app.get("/", (req, res)=>res.send({"msg":"Hello world"}))

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`⚙️ Server is listening at ${PORT}`);
});
