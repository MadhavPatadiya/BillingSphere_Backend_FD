const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this ledger."],
    trim: true,
    maxLength: [50, "Ledger name cannot be more than 50 characters."],
  },
  printName: {
    type: String,
    required: [true, "Please provide a print name for this ledger."],
    trim: true,
    maxLength: [50, "Ledger print name cannot be more than 50 characters."],
  },
  aliasName: {
    type: String,
    required: [true, "Please provide an alias name for this ledger."],
    trim: true,
    maxLength: [50, "Ledger alias name cannot be more than 50 characters."],
  },
  ledgerGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LedgerGroup",
    required: [true, "Please provide a ledger group for this ledger."],
  },

  bilwiseAccounting: {
    type: String,
    required: [true, "Please provide a bilwise accounting for this ledger."],
  },
  creditDays: {
    type: Number,
    required: [true, "Please provide a credit days for this ledger."],
  },
  openingBalance: {
    type: Number,
    required: [true, "Please provide a opening balance for this ledger."],
  },
  ledgerType: {
    type: String,
    required: [true, "Please provide a ledger type for this ledger."],
  },
  priceListCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Price",
    required: [true, "Please provide a credit limit for this ledger."],
  },
  remarks: {
    type: String,
    required: [true, "Please provide remark for this ledger."],
  },
  status: {
    type: String,
    required: [true, "Please provide the status for this ledger."],
  },
  ledgerCode: {
    type: Number,
    required: [true, "Please provide ledger code."],
  },
  mailingName: {
    type: String,
    required: [true, "Please provide mailing name for this ledger"],
  },
  address: {
    type: String,
    required: [true, "Please provide address for this mailing address."],
  },
  city: {
    type: String,
    required: [true, "Please provide city for this ledger."],
  },
  region: {
    type: String,
    required: [true, "Please provide region details for this ledger."],
  },
  state: {
    type: String,
    required: [true, "Please provide a matching state for this ledger."],
  },
  pincode: {
    type: Number,
    required: [true, "Please provide pincode for this ledger."],
  },
  tel: {
    type: Number,
    required: [true, "Please provide a telephone number."],
    maxLength: [10, "Telephone no. cannot be more than 10 characters"],
  },
  fax: {
    type: Number,
    required: [true, "Please provide fax details for this ledger."],
  },
  mobile: {
    type: Number,
    required: [true, "Please provide mobile number for this ledger."],
    maxLength: [10, "Mobile no. cannot be more than 10 characters"],
  },
  sms: {
    type: Number,
    required: [true, "Please provide mobile number for this ledger."],
    maxLength: [10, "Mobile no. cannot be more than 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address for this ledger."],
  },
  contactPerson: {
    type: String,
    required: [true, "Please provide a contact person for this ledger."],
  },
  bankDetails: {
    type: String,
    required: [true, "Please provide bank details for this ledger."],
  },
  panNo: {
    type: String,
    required: [
      true,
      "Please provide a Permanent Account Number for this ledger.",
    ],
  },
  gst: {
    type: String,
    required: [true, "Please provide GST for this ledger."],
  },
  gstDated: {
    type: String,
  },
  cstNo: {
    type: String,
    required: [true, "Please provide a valid CST No for this ledger."],
  },
  cstDated: {
    type: String,
  },
  lstNo: {
    type: String,
  },
  lstDated: {
    type: String,
  },
  serviceTaxNo: {
    type: String,
    required: [true, "Please provide a valid Service Tax No for this ledger."],
  },
  serviceTaxDated: {
    type: String,
  },
  registrationType: {
    type: String,
    required: [true, "Please provide a registration type for this ledger."],
  },
  registrationTypeDated: {
    type: String,
  },
  user_id: {
    type: String,
    required: [true, "Please provide a registration type for this ledger."],
  },

});

module.exports = mongoose.model("Ledger", ledgerSchema);
