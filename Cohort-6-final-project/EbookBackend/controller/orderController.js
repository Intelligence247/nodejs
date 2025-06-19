const Cart = require("../models/cartModels");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  const cart = await Cart.findOne({ userId: user._id });
  if (!cart || cart.cartList.lenght === 0) {
    res.status(400);
    throw new Error("your cart is empty");
  }
  const cartList = cart.cartList;
  const quantity = cartList.length;
  const amount_paid = cartList.reduce((acc, item) => acc + item.price, 0);

  const newOrder = new Order({
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
    },

    cartList,
    quantity,
    amount_paid,
  });

  const savedOrder = await newOrder.save();
  cart.cartList = [];
  await cart.save();

  res.status(201).json(savedOrder);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ "user.id": userId });
  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No Orders Found");
  }

  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("you have no orders");
  }

  if (order.user.id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("not authorized");
  }
  res.status(200).json(order);
});



module.exports = {
  placeOrder,
  getOrderById,
  getUserOrders,
};
