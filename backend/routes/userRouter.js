const express = require("express");
const router = express.Router();
const {
  registerController,
  verifyCodeController,
  loginController,
  logoutController,
  getUserProfileController,
  updateUserProfileController,
  forgotPasswordController,
  resetPasswordController,
  getAllUsersController,
  followUserController,
  unfollowUserController,
} = require("../controllers/userController");
const { isLoggedin } = require("../middlewares/isLoggedin");
const upload = require("../config/multerConfig");

router.post("/register", registerController);

router.post("/verify-code", verifyCodeController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/profile", isLoggedin, getUserProfileController);

router.put(
  "/update/profile",
  isLoggedin,
  upload.single("profilePicture"),
  updateUserProfileController
);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password/:token", resetPasswordController);

router.get("/all-users",getAllUsersController)

router.post("/follow/:id",isLoggedin,followUserController)

router.post("/unfollow/:id",isLoggedin,unfollowUserController)

module.exports = router;