const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

module.exports = function () {
  router.post("/register", userController.createUser);
  router.get("/user/:email", userController.getUserByEmail);
  // router.get('/', userController.getAll);
  router.get("/getrole/:email", userController.setUserRole);
  router.post("/update/:userId", userController.updateUser);

  return router;
};
