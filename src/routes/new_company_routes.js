const NewCompanyController = require("../controllers/new_company_controller");

const express = require("express");
const router = express.Router();

router.post("/create", NewCompanyController.createNewCompany);
router.put("/update/:id", NewCompanyController.updateNewCompany);
router.delete("/delete/:id", NewCompanyController.deleteNewCompany);
router.get("/all", NewCompanyController.getAllCompany);
router.get("/get/:id", NewCompanyController.getSingleCompany);

module.exports = router;
