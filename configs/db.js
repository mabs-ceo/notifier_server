const mongoose = require ("mongoose");
const dotenv = require( "dotenv");

dotenv.config();

const connectDB = async () => {
  try {
 await mongoose.connect(process.env.MONGO_URI, {
     
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

  
  } catch (error) {
   
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
