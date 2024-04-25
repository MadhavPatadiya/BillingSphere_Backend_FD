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
  },
  companyType: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: false,
    default: "",
  },
  lstNo: {
    type: String,
    required: false,
    default: "",
  },
  cstNo: {
    type: String,
    required: false,
    default: "",
  },
  gstin: {
    type: String,
    required: false,

    default: "",
  },
  signatory: {
    type: String,
    required: false,
    default: "",
  },
  designation: {
    type: String,
    required: false,
    default: "",
  },
  pan: {
    type: String,
    required: false,
    default: "",
  },
  ewayBill: {
    type: String,
    required: false,
    default: "",
  },
  caching: {
    type: String,
    required: false,
    default: "",
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
  logo1: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  logo2: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  signature: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  stores: [
    {
      code: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      accountNo: {
        type: String,
        required: true,
      },
      accountName: {
        type: String,
        required: true,
      },
      upi: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
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
  try {
    for (const store of this.stores) {
      const randomNumber =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      store.code = randomNumber.toString();
      const user = new User({
        email: store.email,
        password: store.password,
        fullName: this.companyName + store.code,
        usergroup: "Admin",
        companies: [store.code],
      });
      await user.save();
    }

    const user = new User({
      email: this.emailID,
      password: this.password,
      fullName: this.companyName,
      usergroup: "Admin",
      companies: [this.companyCode],
    });
    await user.save();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("NewCompany", NewCompanySchema);
