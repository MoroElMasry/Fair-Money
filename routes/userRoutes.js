const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);
router.get("/search", authController.protect, userController.search);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
