const mongoose = require('mongoose');
const dns = require("dns")
dns.setServers(["8.8.8.8","8.8.4.4"]) 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://purnimatatina24_db_user:Leela%4019@cluster0.zcpo10k.mongodb.net/studentDB?retryWrites=true&w=majority'); 
    console.log('MongoDB Connected to studentDB');
  } catch (err) {
    console.error("MongoDB Error: ", err);
    process.exit(1);
  }
}
module.exports = connectDB;
