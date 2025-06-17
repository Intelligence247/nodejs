const express = require("express");

const { addToCart } = require("../controller/cartController");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/addtocart", protect, addToCart);

module.exports = router;
