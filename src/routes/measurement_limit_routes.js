const MeasurementLimitController = require("../controllers/measurement_limit_controller");
const MeasurementLimitRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all measurement limit
MeasurementLimitRoutes.get(
  "/fetchAllmeasurement",
  verifyToken,
  MeasurementLimitController.fetchAllMeasurementLimit
);
//For creating measurement
MeasurementLimitRoutes.post(
  "/createmeasurement",
  verifyToken,
  MeasurementLimitController.createMeasurementLimit
);
//For fetching  measurement by id
MeasurementLimitRoutes.get(
  "/get/:id",
  verifyToken,
  MeasurementLimitController.fetchMeasurementLimitById
);
module.exports = MeasurementLimitRoutes;
