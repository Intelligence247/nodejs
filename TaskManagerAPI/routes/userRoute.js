const express = require("express");
const router = express.Router();
const {
  handleNewUser,
  handleLogin,
  getUserInfo,
  updateUserInfo,
} = require("../controller/userController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verfiyRoles");
const ROLES_LIST = require("../config/roles_list");

router.post("/registerUser", handleNewUser);
router.post("/login", handleLogin);
// router.get("/getUserInfo", verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getUserInfo);
// router.put("/updateUser", verifyJWT, updateUserInfo);

module.exports = router;
