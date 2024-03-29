const SalesEntry = require("../models/sales_entry_model");

//For Creating Sales
const createSales = async (req, res) => {
  try {
    const existingSales = await SalesEntry.findOne({
      $or: [{ dcNo: req.body.dcNo }],
    });

    if (existingSales) {
      return res.json({
        success: false,
        message: "Bill No already exists.",
      });
    }

    const sales = await SalesEntry.create(req.body);
    // console.log(sales);
    return res.json({ success: true, message: "Sales Created", data: sales });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating Sales
const updateSales = async (req, res) => {
  try {
    const sales = await SalesEntry.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sales) {
      return res.json({ success: false, message: "Sales Entry not found" });
    }

    return res.json({ success: true, data: sales });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For Deleting Sales
const deleteSales = async (req, res) => {
  try {
    const sales = await SalesEntry.deleteOne({ _id: req.params.id });
    if (!sales) {
      return res.json({ success: false, message: "Sales Entry not found" });
    }
    return res.json({
      success: true,
      message: "Sales Entry Deleted Successfully!",
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//  Get all sales
const getAllSales = async (req, res) => {
  try {
    const sales = await SalesEntry.find({});
    return res.json({ success: true, data: sales });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

// Get single sales
const getSingleSales = async (req, res) => {
  try {
    const sales = await SalesEntry.findOne({ _id: req.params.id });
    if (!sales) {
      return res.json({ success: false, message: "Sales Entry not found" });
    }
    return res.json({ success: true, data: sales });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createSales,
  updateSales,
  deleteSales,
  getAllSales,
  getSingleSales,
};
