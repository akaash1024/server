const mongoose = require("mongoose")
const URL = process.env.MONGO_URL
const connectDB = async () => {
    await mongoose.connect(URL)
    console.log("Connected to mongodb database")
    try {

    } catch (error) {
        console.error("Failed to connect database", error.message)
    }
}

module.exports = connectDB