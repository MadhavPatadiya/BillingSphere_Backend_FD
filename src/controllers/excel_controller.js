var Item = require("../models/items_model");
var csv = require('csvtojson');
const { response } = require("../routes/excel_routes");
const CsvParser = require('json2csv').Parser;
const fs = require('fs');

const importExcel = async (req, res) => {

    try {
        var itemData = [];

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {

                for (var x = 0; x < response.length; x++) {
                    itemData.push({
                        _id: response[x]._id,
                        companyCode: response[x].companyCode,
                        itemGroup: response[x].itemGroup,
                        itemBrand: response[x].itemBrand,
                        itemName: response[x].itemName,
                        printName: response[x].printName,
                        codeNo: response[x].codeNo,
                        taxCategory: response[x].taxCategory,
                        hsnCode: response[x].hsnCode,
                        barcode: response[x].barcode,
                        storeLocation: response[x].storeLocation,
                        measurementUnit: response[x].measurementUnit,
                        secondaryUnit: response[x].secondaryUnit,
                        minimumStock: response[x].minimumStock,
                        maximumStock: response[x].maximumStock,
                        monthlySalesQty: response[x].monthlySalesQty,
                        date: response[x].date,
                        dealer: response[x].dealer,
                        subDealer: response[x].subDealer,
                        retail: response[x].retail,
                        mrp: response[x].mrp,
                        price: response[x].price,
                        openingStock: response[x].openingStock,
                        status: response[x].status,
                    });
                }
                await Item.insertMany(itemData);

                fs.unlinkSync(req.file.path);

            });

        res.send({ status: 400, success: true, msg: 'CSV Imported' });

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });

    }
}

const exportExcel = async (req, res) => {

    try {
        let items = [];
        var itemData = await Item.find({});

        itemData.forEach((item) => {
            const { _id, companyCode, itemGroup, itemName, printName, codeNo, taxCategory, hsnCode, barcode, storeLocation, measurementUnit, secondaryUnit, minimumStock, maximumStock, monthlySalesQty, date, dealer, subDealer, retail, mrp, price, openingStock, status } = item;
            items.push({ _id, companyCode, itemGroup, itemName, printName, codeNo, taxCategory, hsnCode, barcode, storeLocation, measurementUnit, secondaryUnit, minimumStock, maximumStock, monthlySalesQty, date, dealer, subDealer, retail, mrp, price, openingStock, status });
        });

        const csvFields = ['_id', 'companyCode', 'itemGroup', 'itemName', 'printName', 'codeNo', 'taxCategory', 'hsnCode', 'barcode', 'storeLocation', 'measurementUnit', 'secondaryUnit', 'minimumStock', 'maximumStock', 'monthlySalesQty', 'date', 'dealer', 'subDealer', 'retail', 'mrp', 'price', 'openingStock', 'status'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(items);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=itemsData.csv");
        res.status(200).end(csvData);

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}

module.exports = { importExcel, exportExcel };
