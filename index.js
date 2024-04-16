// importing express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./database/database");

// Creating an express app
const app = express();

// json Config
app.use(express.json());

// configuration dotenv
dotenv.config();

// Connecting to the database
connectDB();
// Defining the port
const PORT = process.env.PORT;

// Creating a test route or endpoint
app.get("/test", (req, res) => {
  res.send("Test Api is working...!");
});

// configuring user routes
app.use("/api/user", require("./routes/userRoutes"));
// http://localhost:5000/api/user/create

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

// API URL
// http://localhost:5000/test
