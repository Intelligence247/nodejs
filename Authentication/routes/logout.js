const express = require("express");
const router = express.Router();

const {
  handleLogout,
  handleMyLogout,
} = require("../controller/logoutController");

router.get("/", handleLogout);
router.get("/myLogout", handleMyLogout);

module.exports = router;
