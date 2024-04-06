const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  // For Creating User Account

  createAccount: async function (req, res) {
    try {
      const userData = req.body;
      const newUser = new UserModel(userData);

      await newUser.save();

      console.log(newUser);

      return res.json({
        success: true,
        data: newUser,
        message: "User has been created successfully!",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  // Create Account for Admin
  createAccount2: async function (req, res) {
    try {
      const userData = req.body;
      const newUser = new UserModel(userData);

      await newUser.save();

      console.log(newUser);

      return res.json({
        success: true,
        data: newUser,
        message: "User has been created successfully!",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //For SignIn through Email and Password

  signIn: async function (req, res) {
    try {
      const { email, password } = req.body;
      const foundUser = await UserModel.findOne({
        email: email,
      });
      if (!foundUser) {
        return res.json({ success: false, message: "User not found!" });
      }
      const passwordMatch = bcrypt.compareSync(password, foundUser.password);
      if (!passwordMatch) {
        return res.json({ success: false, message: "Incorrect password!" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: foundUser._id }, "your-secret-key", {
        expiresIn: "6h",
      });

      console.log(token);

      return res.json({ success: true, data: foundUser, token: token });
    } catch (ex) {
      return res.json({ success: false, message: "error" });
    }
  },
};

module.exports = UserController;
