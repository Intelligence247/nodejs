const express = require("express");
const router = express.Router();
const {
  handleNewUser,
  handleLogin,
  handleRegisterMyUser,
  handleLoginMyUser,
  handleGetAllUsers,
} = require("../controller/userController");

router.post("/registerUser", handleNewUser);
router.post("/login", handleLogin);
router.post("/registerMyUser", handleRegisterMyUser);
router.post("/loginMyUser", handleLoginMyUser);
router.get("/getAllUsers", handleGetAllUsers);

module.exports = router;
