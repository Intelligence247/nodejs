const express = require("express");
// const User = require("../models/User");

const {
  registerUser,
  registerAdmin,
  loginUser,
  logout,
  getUserProfile,
} = require("../controller/userController");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/logout", logout);

module.exports = router;
