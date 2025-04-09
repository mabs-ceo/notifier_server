const mongoose = require ("mongoose");
const dotenv = require( "dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
     
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
