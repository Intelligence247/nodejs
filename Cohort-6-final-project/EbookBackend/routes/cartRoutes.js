const express = require("express");
const {
  addToCart,
  removeFromCart,
  clearCart,
  getUserCart,
} = require("../controller/cartController");
const { protect } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/addtocart", protect, addToCart);
router.delete("/removecart", protect, removeFromCart);
router.delete("/clearcart", protect, clearCart);
router.get("/getcarts", protect, getUserCart);

module.exports = router;
