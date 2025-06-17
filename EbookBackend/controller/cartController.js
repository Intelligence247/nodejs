const Cart = require("../models/cartModels");

const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  //   const { _id } = req.user;
  console.log(req.user.id);
});

module.exports = { addToCart };
