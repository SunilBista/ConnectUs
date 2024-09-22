const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  const dburi = process.env.MONGODB_URI;
  try {
    await mongoose.connect(dburi);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

module.exports = dbConnect;
