const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./user_model");

const NewCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyCode: {
    type: String,
    required: false,
    default: "",
  },
  companyType: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  taxation: {
    type: String,
    required: true,
  },
  acYear: {
    type: String,
    required: true,
  },
  acYearTo: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

NewCompanySchema.pre("save", async function (next) {
  const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  this.companyCode = randomNumber.toString();

  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;

      const user = new User({
        email: this.emailID,
        password: hashedPassword,
        fullName: this.companyName,
        usergroup: "Admin",
      });
      await user.save();
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("NewCompany", NewCompanySchema);
