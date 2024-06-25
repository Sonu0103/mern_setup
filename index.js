// importing express
const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/database");
const cors = require("cors");
const fileupload = require("express-fileupload");
const path = require("path");
// Creating an express app
const app = express();

// json Config
app.use(express.json());

// fileupload config
app.use(fileupload());
// make a public folder access to outside
app.use(express.static("./public"));

//Cors config
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// configuration dotenv
dotenv.config();

// Connecting to the database
connectDb();
// Defining the port
const PORT = process.env.PORT;

// Creating a test route or endpoint
app.get("/test", (req, res) => {
  res.send("Test Api is working...!");
});

// Creating a test route or endpoint
app.get("/test_new", (req, res) => {
  res.send("Test Api is working...!");
});

// configuring user routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
// http://localhost:5000/api/user/create

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

// API URL
// http://localhost:5000/test

// exporting for testing
module.exports = app;
