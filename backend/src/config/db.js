const mongoose = require('mongoose');

async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected on ${conn.connection.host}`.cyan);
    } catch (err) {
        console.log(`MongoDB Error : ${err.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}