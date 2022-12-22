const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(["/", "/index"], authController.isLoggedIn, viewController.getIndex);
router.get("/signUp", viewController.getSignUp);
router.get("/signIn", viewController.getSignIn);
router.get(
  "/groupListPage",
  authController.protect,
  viewController.getGroupList
);
router.get("/createNewGroup", viewController.getCreateNewGroup);
router.get("/specificGroupPage", viewController.getSpecificGroup);

module.exports = router;
