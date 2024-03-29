const HsnCodeController = require("../controllers/hsn_code_controller");

const HsnCodeRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all hsn codes
HsnCodeRoutes.get(
  "/fetchAllHsncode",
  verifyToken,
  HsnCodeController.fetchAllHsnCode
);
//For creating hsn codes
HsnCodeRoutes.post(
  "/createHsnCode",
  verifyToken,
  HsnCodeController.createHsnCode
);
//For fetching hsn code by id
HsnCodeRoutes.get("/get/:id", verifyToken, HsnCodeController.fetchHsnCodeById);
module.exports = HsnCodeRoutes;
