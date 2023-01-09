const express = require("express");
const groupController = require("../controllers/groupController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  // .get(authController.protect, groupController.getAllGroups) //of specific user
  .post(authController.protect, groupController.createGroup);
router
  .route("/:id")
  .get(authController.protect, groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

module.exports = router;
