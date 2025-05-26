const express = require("express");
const router = express.Router();
const path = require("path");

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "subdir", "index.html"));
  console.log("Hello");
});

router.get(/^\/$|\/text(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "subdir", "text.html"));
  console.log("Hello");
});

module.exports = router;
