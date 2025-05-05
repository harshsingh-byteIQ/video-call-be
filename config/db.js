const mongoose = require("mongoose");

const connectDB = async () => {
    return mongoose.connect("mongodb+srv://suryamanipatra114:8sVt5kQPWbUlZCFB@cluster0.q0xg25i.mongodb.net/room").then(() => console.log("MongoDB connected..."));
};

module.exports = connectDB;
