const ReceiptVoucher = require("../models/receipt_voucher_model");
const Ledger = require("../models/ledger_model");

const ReceiptVoucherController = {
    createReceiptVoucher: async (req, res) => {
        try {

            const receiptData = req.body;
            const debit = receiptData.debit;
            const credit = receiptData.credit;
            const ledgerID = receiptData.ledger;
            const receiptType = receiptData.account;

            if (receiptType == "Dr") {
                const ledgerfetch = await Ledger.findById(ledgerID);
                ledgerfetch.openingBalance -= parseFloat(debit); // Parse debit as float
                await ledgerfetch.save(); // Save the ledger
            } else if (receiptType == "Cr") {
                const ledgerfetch = await Ledger.findById(ledgerID);
                ledgerfetch.openingBalance += parseFloat(credit); // Parse credit as float
                await ledgerfetch.save(); // Save the ledger
            }



            const receiptvoucher = new ReceiptVoucher(req.body);
            const savedReceiptVoucher = await receiptvoucher.save();
            res.status(201).json(savedReceiptVoucher);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getReceiptVoucher: async (req, res) => {
        try {
            const receiptvoucher = await ReceiptVoucher.find();
            res.status(200).json(receiptvoucher);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    getReceiptVoucherById: async (req, res) => {
        try {
            const receiptvoucher = await receiptvoucher.findById(req.params.id);
            if (!payment) {
                return res.status(404).json({ error: "ReceiptVoucher not found" });
            }
            res.status(200).json(receiptvoucher);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateReceiptVoucher: async (req, res) => {
        try {
            const updatedreceiptvoucher = await receiptvoucher.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedreceiptvoucher) {
                return res.status(404).json({ error: "ReceiptVoucher not found" });
            }
            res.status(200).json(updatedreceiptvoucher);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteReceiptVoucher: async (req, res) => {
        try {
            const deletedreceiptvoucher = await receiptvoucher.findByIdAndDelete(req.params.id);
            if (!deletedreceiptvoucher) {
                return res.status(404).json({ error: "ReceiptVoucher not found" });
            }
            res.status(200).json({ message: "ReceiptVoucher deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
}


module.exports = ReceiptVoucherController;
