const mongoose = require('mongoose');

//mongoose functions return promises
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);//last bit is the colors
};

module.exports = connectDB;