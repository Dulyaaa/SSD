const express = require("express");
const { verifyWorker } = require("../../middleware/verifyToken");
const router = express.Router();
const controller = require("../controller/messageController");

module.exports = function () {
  router.post("/create", verifyWorker, controller.createMessage);

  return router;
};
