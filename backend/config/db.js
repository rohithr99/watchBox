//import mongoose
const mongoose = require('mongoose');

//import MONGO_URI from .env
const db = process.env.MONGO_URI;

//connecting to database
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err);
        console.log("failed to connect to MongoDB");
    }
}

module.exports = connectDB;