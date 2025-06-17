const express = require("express");
// const User = require("../models/User");

const {
  registerUser,
  registerAdmin,
  loginUser,
  logout,
} = require("../controller/userController");

const router = express.Router();

router.post("/", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
