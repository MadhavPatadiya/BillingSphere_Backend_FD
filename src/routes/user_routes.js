const UserRoutes = require("express").Router();
const UserController = require("../controllers/user_controller");
const restrictAccessByUserType = require("../middleware/restriction");

UserRoutes.post("/createAccount", UserController.createAccount);
UserRoutes.post(
  "/createAccount2",
  restrictAccessByUserType(["Admin"]),
  UserController.createAccount2
);
UserRoutes.post("/signIn", UserController.signIn);

module.exports = UserRoutes;
