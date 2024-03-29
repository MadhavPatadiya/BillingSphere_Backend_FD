const mongoose = require("mongoose");
const productStockSchema = new mongoose.Schema({
  productid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  mfgdate: {
    type: Number,
    required: true,
  },
  expdate: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  sub_categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ProductStockModel = mongoose.model("ProductStock", productStockSchema);
module.exports = ProductStockModel;
