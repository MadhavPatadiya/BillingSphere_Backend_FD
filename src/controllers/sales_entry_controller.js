const SalesEntry = require("../models/sales_entry_model");
const Items = require("../models/items_model");
const Ledger = require("../models/ledger_model");
const fs = require('fs');
const pdfkit = require('pdfkit');

//For Creating Sales
const createSales = async (req, res) => {
  try {
    const salesData = req.body;
    salesData.totalamount = parseFloat(salesData.totalamount);
    salesData.cashAmount = parseFloat(salesData.cashAmount);
    salesData.dueAmount = parseFloat(salesData.dueAmount);
    const newsalesData = SalesEntry(salesData);

    const ledgerID = salesData.party;
    const saleType = salesData.type;
    let ledger = null;

    if (saleType === "Debit") {
      const ledger = await Ledger.findById(ledgerID);

      console.log(salesData.totalamount);

      if (!ledger) {
        return res.json({
          success: false,
          message: "Ledger not found.",
        });
      }

      if (ledger.openingBalance < salesData.totalamount) {
        return res.json({
          success: false,
          message: "Insufficient opening balance.",
        });
      }

      ledger.openingBalance -= salesData.totalamount;

      // Save the updated ledger back to the database
      await ledger.save();
    }
    // if (saleType === "Debit") {
    //   const ledger = await Ledger.findById(ledgerID);

    //   if (!ledger) {
    //     return res.json({
    //       success: false,
    //       message: "Ledger not found.",
    //     });
    //   }

    //   if (ledger.openingBalance < salesData.totalamount) {
    //     const remainingAmount =
    //       salesData.totalamount + ledger.openingBalance;
    //     salesData.dueAmount = remainingAmount;
    //     ledger.openingBalance = 0;
    //     newsalesData.dueAmount = salesData.dueAmount;
    //   } else if (ledger.openingBalance >= salesData.totalamount) {
    //     ledger.openingBalance -= salesData.totalamount;
    //   }
    //   await ledger.save();
    // }

    // if (saleType === "Cash") {
    //   if (salesData.cashAmount < salesData.totalamount) {
    //     salesData.dueAmount =
    //       salesData.totalamount + salesData.cashAmount;

    //     newsalesData.dueAmount = salesData.dueAmount;
    //   } else {
    //     salesData.dueAmount = 0;
    //     newsalesData.dueAmount = salesData.dueAmount;
    //   }
    // }

    const existingSales = await SalesEntry.findOne({
      $or: [{ dcNo: req.body.dcNo }],
    });

    if (existingSales) {
      return res.json({
        success: false,
        message: "Bill No already exists.",
      });
    }

    await newsalesData.save();

    for (const entry of salesData.entries) {
      const salesId = entry.itemName;
      const quantity = entry.qty;

      const sales = await Items.findById(salesId);

      if (!sales) {
        return res.json({
          success: false,
          message: "sales not found.",
        });
      }

      // Update maximum stock
      sales.maximumStock -= quantity;
      await sales.save();
    }

    // const sales = await SalesEntry.create(req.body);
    // console.log(sales);
    return res.json({
      success: true,
      message: "Sales Created",
      data: newsalesData,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
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

    generateReceiptPDF(sales);

    res.download(`receipt_${sales._id}.pdf`);
    // return res.json({ success: true, data: sales });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const generateReceiptPDF = (salesData) => {
  const doc = new pdfkit();
  // Customize the PDF content based on your requirements
  doc.text(`Receipt for Sales Entry ${salesData._id}`);
  doc.text(`Date: ${salesData.date}`);
  // Add more details as needed
  
  // Save the PDF to a buffer
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    // Save the PDF to a file
    fs.writeFileSync(`receipt_${salesData._id}.pdf`, pdfData);
  });
  doc.end();
};

module.exports = {
  createSales,
  updateSales,
  deleteSales,
  getAllSales,
  getSingleSales,
};


