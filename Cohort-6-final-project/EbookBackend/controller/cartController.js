const Cart = require("../models/cartModels");
const Ebook = require("../models/ebookmodel");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { id } = req.body;
  //   res.status(200).json({ User: req.user.id });
  try {
    let cart = await Cart.findOne({ userId });
    const ebook = await Ebook.findOne({ id });

    if (!cart) {
      cart = new CartList({
        userId,
        cartList: [ebook],
      });
    } else {
      const existingCartIndex = cart.cartList.findIndex(
        (item) => item.id === id
      );
      if (existingCartIndex !== -1) {
        res.status(400);
        throw new Error("Already added to cart");
      } else {
        cart.cartList.push(ebook);
      }
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body; // ID of ebook to remove

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartList.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    // Remove item from cart
    cart.cartList.splice(itemIndex, 1);
    const updatedCart = await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("cart not found");
  }

  cart.cartList = [];
  const clearedCart = await cart.save();
  res.status(200).json(clearedCart);
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }
  res.status(200).json(cart);
});

module.exports = { addToCart, removeFromCart, clearCart, getUserCart };
