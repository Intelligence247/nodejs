const express = require("express");
const {
  placeOrder,
  getOrderById,
  getUserOrders,
} = require("../controller/orderController");
const { protect } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/placeorder", protect, placeOrder);
router.get("/userorders/:id", protect, getOrderById);
router.get("/userorders", protect, getUserOrders);

module.exports = router;