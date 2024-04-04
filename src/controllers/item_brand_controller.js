const mongoose = require("mongoose");
const ItemsBrand = require("../models/item_brand_model");

const createItemGroup = async (req, res) => {
  try {
    const newItemGroup = await ItemsBrand.create(req.body);
    res.json({ success: true, data: newItemGroup });
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const getItemGroups = async (req, res) => {
  try {
    const allItemGroups = await ItemsBrand.find();
    res.json({ success: true, data: allItemGroups });
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const getItemGroupById = async (req, res) => {
  try {
    const itemGroup = await ItemsBrand.findById(req.params.itemGroupId);
    if (itemGroup) {
      res.json({ success: true, data: itemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const updateItemGroup = async (req, res) => {
  try {
    const updatedItemGroup = await ItemsBrand.findByIdAndUpdate(
      req.params.itemGroupId,
      req.body,
      { new: true }
    );
    if (updatedItemGroup) {
      res.json({ success: true, data: updatedItemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const deleteItemGroup = async (req, res) => {
  try {
    const deletedItemGroup = await ItemsBrand.findByIdAndDelete(
      req.params.itemGroupId
    );
    if (deletedItemGroup) {
      res.json({ success: true, data: deletedItemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

module.exports = {
  createItemGroup,
  getItemGroups,
  getItemGroupById,
  updateItemGroup,
  deleteItemGroup,
};


