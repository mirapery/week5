const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/web-dev");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

// Comments:
// The connection string "mongodb://localhost:27017/web-dev" should be stored in an environment variable for security
// I would replace the line with this:
//  const conn = await mongoose.connect(process.env.MONGO_URI);