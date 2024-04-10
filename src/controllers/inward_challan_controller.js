const InwardChallanModel = require("../models/inward_challan_model");
const ProductStockModel = require("../models/product_stock_model");

// For creating a new inward challan

const createInwardChallan = async (req, res) => {
  try {
    const inwardChallan = new InwardChallanModel(req.body);
    // Iterate over the entries and save a new product stock for each entry
    for (let entry of req.body.entries) {
      const productStock = new ProductStockModel({
        company: req.body.companyCode,
        product: entry.itemName,
        quantity: entry.qty,
        price: entry.rate,
        selling_price: entry.netAmount,
      });
      await productStock.save();
    }
    await inwardChallan.save();
    res.status(201).send(inwardChallan);
  } catch (error) {
    res.status(400).send(error);
  }
};

// For getting all inward challans
const getAllInwardChallans = async (req, res) => {
  try {
    const inwardChallans = await InwardChallanModel.find();
    res.status(200).send(inwardChallans);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For getting a single inward challan
const getInwardChallan = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findById(req.params.id);
    if (!inwardChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(inwardChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For updating a inward challan
const updateInwardChallan = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inwardChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(inwardChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For deleting a inward challan
const deleteInwardChallan = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findByIdAndDelete(
      req.params.id
    );
    if (!inwardChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(inwardChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createInwardChallan,
  getAllInwardChallans,
  getInwardChallan,
  updateInwardChallan,
  deleteInwardChallan,
};
