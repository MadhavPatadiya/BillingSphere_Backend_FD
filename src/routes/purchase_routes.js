const PurchaseController = require("../controllers/purchase_controller");
const PurchaseRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For getting all purchase entry
PurchaseRoutes.get(
  "/fetchAll/:user_id",
  verifyToken,
  PurchaseController.fetchAllPurchase
);
PurchaseRoutes.post("/create", verifyToken, PurchaseController.createPurchase);
PurchaseRoutes.get("/:id", verifyToken, PurchaseController.fetchPurchseById);
PurchaseRoutes.delete(
  "/delete/:id",
  // verifyToken,
  PurchaseController.deletePurchaseById
);

module.exports = PurchaseRoutes;
