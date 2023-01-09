const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const groupController = require("../controllers/groupController");

const router = express.Router();

router.get(["/", "/index"], authController.isLoggedIn, viewController.getIndex);
router.get("/signUp", viewController.getSignUp);
router.get("/signIn", viewController.getSignIn);
router.get(
  "/groupListPage",
  authController.protect,
  groupController.getAllGroups,
  viewController.getGroupList
);
router.get("/createNewGroup", viewController.getCreateNewGroup);
router.get(
  "/:id",
  authController.protect,
  groupController.getGroup,
  viewController.getSpecificGroup
);

module.exports = router;
