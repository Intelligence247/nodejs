const express = require("express");

const {
  createEbook,
  updateEbook,
  getAllEbook,
  getAnEbook,
} = require("../controller/ebookController");
const { adminProtect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/createEbook", adminProtect, createEbook);
router.put("/updateEbook/:id", adminProtect, updateEbook);
router.get("/getebooks", getAllEbook);
router.get("/getebooks/:id", getAnEbook);

module.exports = router;
