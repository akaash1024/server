const  mongoose  = require("mongoose")


const MONGO_URI= process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`Mongo Database is connected`)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB;