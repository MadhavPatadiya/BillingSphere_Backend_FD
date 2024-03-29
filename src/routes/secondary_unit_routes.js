const SecondaryUnitController = require("../controllers/secondaryunit_controller");

const SecondaryUnitRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all secondary unit
SecondaryUnitRoutes.get(
  "/fetchAllSecondaryUnit",
  verifyToken,
  SecondaryUnitController.fetchAllSecondaryUnit
);
//For creating secondary unit
SecondaryUnitRoutes.post(
  "/createSecondaryUnit",
  verifyToken,
  SecondaryUnitController.createSecondaryUnit
);
//For fetching secondary unit by id
SecondaryUnitRoutes.get(
  "/:id",
  verifyToken,
  SecondaryUnitController.fetchSecondaryUnitById
);

module.exports = SecondaryUnitRoutes;
