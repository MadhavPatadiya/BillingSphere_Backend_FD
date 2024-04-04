const mongoose = require("mongoose");

const ReceiptVoucherSchema = new mongoose.Schema({
    no: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    totalamount: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    ledger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ledger",
        required: true,
    },
    remark: {
        type: String,
        required: false,
    },
    debit: {
        type: Number,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    //---------
    cashaccount: {
        type: String,
        required: true,
    },
    cashtype: {
        type: String,
        required: true,
    },
    cashremark: {
        type: String,
        required: false,
    },
    cashdebit: {
        type: Number,
        required: true,
    },
    cashcredit: {
        type: Number,
        required: true,
    },



    // entries: [
    //     {
    //         account: {
    //             type: String,
    //             required: true,
    //         },
    //         ledger: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "Ledger",
    //             required: true,
    //         },
    //         remark: {
    //             type: String,
    //             required: false,
    //         },
    //         debit: {
    //             type: Number,
    //             required: true,
    //         },
    //         credit: {
    //             type: Number,
    //             required: true,
    //         },
    //     },
    // ],
    // cashtype: [
    //     {
    //         cashaccount: {
    //             type: String,
    //             required: true,
    //         },
    //         type: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "Ledger",
    //             required: true,
    //         },
    //         cashremark: {
    //             type: String,
    //             required: false,
    //         },
    //         cashdebit: {
    //             type: Number,
    //             required: true,
    //         },
    //         cashcredit: {
    //             type: Number,
    //             required: true,
    //         },
    //     },
    // ],

    naration: {
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("ReceiptVoucher", ReceiptVoucherSchema);
