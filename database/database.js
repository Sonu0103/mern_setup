//  Write a Function
// Importing pacakages
// Always export the function

// 1. Importing the packages
const mongoose = require("mongoose");

// 2. Creating a function
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_CLOUDURL).then(() => {
    console.log("Database Connected Sucessfully");
  });
};

// 3. Exporting the function
module.exports = connectDB;
