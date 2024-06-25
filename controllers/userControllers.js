const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Corrected import statement

// make a function(Logic)

// 1. Creating a user function
const createUser = async (req, res) => {
  console.log(req.body);

  // destructuring
  const { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.json({
      sucess: false,
      message: "please enter all fields!",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists!",
      });
    }
    // Hash the password
    const randomSalt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, randomSalt);

    // Save the User in Database Model
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      phone: phone,
    });

    // Saving the data in database
    await newUser.save();

    // Send the sucess responce
    res.json({
      success: true,
      message: "user created sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      sucess: false,
      message: "Internal server error",
    });
  }
};
//Login User Function
const loginUser = async (req, res) => {
  //checking incoming data
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }
  try {
    //1. find user, if not : stop the process
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }
    //2. Compare the password, if not :stop the process
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    }
    //3. generate JWT token

    //3.1 Secret Decryption key(.env)
    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    //4. Send the token, userData , Message to the user
    res.json({
      success: true,
      message: "User Logged Successful!",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
// forget password using Phone Number
const forgetPassword = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400).json({
      success: false,
      message: "Please provide phone number",
    });
  }
  try {
    // if user find and validate
    const user = await userModel.findOne({ phone: phone });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }
    // generate random otp
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit otp

    // update in database for varification
    user.otpReset = otp;
    user.otpResetExpires = Date.now() + 3600000;
    await user.save();

    // sending otp to phone number
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: " Server Error!",
    });
  }
};

// exporting the createuse
module.exports = {
  createUser,
  loginUser,
};
