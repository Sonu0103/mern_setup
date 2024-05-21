const mongoose = require("mongoose");

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_CLOUDURL).then(() => {
    console.log("database connected sucessfully");
  });

module.exports = connectDb;
