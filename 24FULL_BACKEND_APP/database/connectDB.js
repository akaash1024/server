const mongoose = require("mongoose")

let URL = process.env.MONGO_URL


const connectDB = async () => {
    try {
        console.log(`reached here`);
        
        await mongoose.connect(URL)
        console.log(`Connected to server `)
    } catch (error) {
        console.error(`Failed to connnect server database`, error.message)
        process.exit(0)
    }
}

module.exports = connectDB