const express = require("express");
const { verifyWorker } = require("../../middleware/verifyToken");
const router = express.Router();
const userController = require("../controller/user.controller");

module.exports = function () {
  router.post("/register", userController.createUser);
  router.get("/user/:email", userController.getUserByEmail);
  // router.get('/', userController.getAll);
  router.get("/getrole/:email", userController.setUserRole);
  router.post("/update/:userId", userController.updateUser);

  // TODO - Should implement message and file sending functionalitites
  router.post("/user/post-message", verifyWorker, userController.postMessage);
  router.post("/user/upload-file", verifyWorker, userController.uploadFile);

  return router;
};
