const mongoose = require('mongoose');


const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Database Connected Successfully ${connection.connection.host}`.cyan.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit();
    }
}

module.exports = connectDB;