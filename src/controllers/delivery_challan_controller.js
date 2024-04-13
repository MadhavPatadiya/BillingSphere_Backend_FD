const DeliveryChallanModel = require("../models/delivery_challan_model");
const ProductStockModel = require("../models/product_stock_model");
const ItemModel = require("../models/items_model");

// For creating a new inward challan

const createDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = new DeliveryChallanModel(req.body);
    for (let entry of req.body.entries) {
      let productStock = await ProductStockModel.findOne({
        product: entry.itemName,
        company: req.body.companyCode,
      });

      if (productStock) {
        productStock.quantity += entry.qty;
        productStock.price = entry.rate;
        productStock.selling_price += entry.netAmount;
      } else {
        productStock = new ProductStockModel({
          company: req.body.companyCode,
          product: entry.itemName,
          quantity: entry.qty,
          price: entry.rate,
          selling_price: entry.netAmount,
        });
      }

      // Get the item from the item model and update the stock
      const item = await ItemModel.findById(entry.itemName);
      if (item) {
        item.maximumStock -= entry.qty;
        await item.save();
      }

      console.log(productStock);
      await productStock.save();
    }
    await deliveryChallan.save();
    res.status(201).send(deliveryChallan);
  } catch (error) {
    res.status(400).send(error);
  }
  // try {
  //   const deliveryChallan = new DeliveryChallanModel(req.body);
  //   for (let entry of req.body.entries) {
  //     const item = await ItemModel.findById(entry.itemName);
  //     item.maximumStock -= entry.qty;

  //     await item.save();
  //   //   await productStock.save();
  //   }
  //   await deliveryChallan.save();
  //   res.status(201).send(deliveryChallan);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
};

// For getting all inward challans
const getAllDeliveryChallans = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.find();
    res.status(200).send(deliveryChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For getting a single inward challan
const getDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.findById(req.params.id);
    if (!deliveryChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(deliveryChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For updating a inward challan
const updateDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!deliveryChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(deliveryChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For deleting a inward challan
const deleteDeliveryChallan = async (req, res) => {
  try {
    const inwardChallan = await DeliveryChallanModel.findByIdAndDelete(
      req.params.id
    );
    if (!deliveryChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(deliveryChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDeliveryChallan,
  getAllDeliveryChallans,
  getDeliveryChallan,
  updateDeliveryChallan,
  deleteDeliveryChallan,
};
