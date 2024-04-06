const SalesEntryRoutes = require("express").Router();
const SalesEntryController = require("../controllers/sales_entry_controller");
const verifyToken = require("../middleware/verifyToken");

SalesEntryRoutes.post("/create", verifyToken, SalesEntryController.createSales);
SalesEntryRoutes.put(
  "/update/:id",
  verifyToken,
  SalesEntryController.updateSales
);
SalesEntryRoutes.delete(
  "/delete/:id",
  verifyToken,
  SalesEntryController.deleteSales
);
SalesEntryRoutes.get("/get-all", verifyToken, SalesEntryController.getAllSales);
SalesEntryRoutes.get(
  "/get-single/:id",
  SalesEntryController.getSingleSales
);

module.exports = SalesEntryRoutes;
