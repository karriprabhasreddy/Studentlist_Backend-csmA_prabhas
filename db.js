const mongoose = require('mongoose');
const dns = require("dns")
dns.setServers(["8.8.8.8","8.8.4.4"])

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://karriprabhasreddy_db_user:prabhas123@cluster0.edn3eug.mongodb.net/studentlist'); 
    console.log('MongoDB Connected to studentDB');
  } catch (err) {
    console.error("MongoDB Error: ", err);
    process.exit(1);
  }
}

module.exports = connectDB;
