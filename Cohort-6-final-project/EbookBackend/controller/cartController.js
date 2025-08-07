// const Cart = require("../models/cartModels");
// const Ebook = require("../models/ebookmodel");
// const asyncHandler = require("express-async-handler");

// const addToCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

  


//   const { id } = req.body;
//   //   res.status(200).json({ User: req.user.id });
//   try {
//     let cart = await Cart.findById(userId);
//     const ebook = await Ebook.findOne({ id });

//     console.log({cart, ebook})

//     if (!cart) {
//       cart = new CartList({
//         userId,
//         cartList: [ebook],
//       });
//     } else {
//       const existingCartIndex = cart.cartList.findIndex(
//         (item) => item.id === id
//       );
//       if (existingCartIndex !== -1) {
//         res.status(400);
//         throw new Error("Already added to cart");
//       } else {
//         cart.cartList.push(ebook);
//       }
//     }

//     const savedCart = await cart.save();
//     res.status(200).json(savedCart);
//   } catch (error) {
//     res.status(500).json("Internal Server Error");
//   }
// });

// const removeFromCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { id } = req.body; // ID of ebook to remove

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const itemIndex = cart.cartList.findIndex((item) => item.id === id);
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: "Item not in cart" });
//     }

//     // Remove item from cart
//     cart.cartList.splice(itemIndex, 1);
//     const updatedCart = await cart.save();

//     res.status(200).json({
//       message: "Item removed from cart",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// const clearCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     res.status(404);
//     throw new Error("cart not found");
//   }

//   cart.cartList = [];
//   const clearedCart = await cart.save();
//   res.status(200).json(clearedCart);
// });

// const getUserCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const cart = await Cart.findOne({_id: userId});
//   if (!cart) {
//     res.status(400);
//     throw new Error("Cart not found");
//   }
//   res.status(200).json(cart);
// });

// module.exports = { addToCart, removeFromCart, clearCart, getUserCart };


const Cart = require("../models/cartModels");
const asyncHandler = require("express-async-handler");
const Ebook = require("../models/cartModels");

const addToCart = asyncHandler(async (req, res) => {

  const userId = req.user._id; // Get user ID from the request
  const {id} = req.body; // Get ebook ID from the request body

  
    let cart = await Cart.findOne({ userId });
    const ebook = await Ebook.findOne({id})

    if (!ebook) {
      res.status(404);
      throw new Error("Ebook not found");
    }

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ 
        userId, 
        cartList: [ebook]
    })


  }else{
    const existingCartIndex = cart.cartList.findIndex(
      item => item.id === id
    );
    if(existingCartIndex !== -1){
    res.status(400)
    throw new Error("Ebook already exists in the cart");
    }else{
      // If cart exists, add the ebook to the cartList
      cart.cartList.push(ebook);
    }
  }

  const savedCart = await cart.save();
  res.status(201).json(savedCart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request
  const { id } = req.body; // Get ebook ID from the request body

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const existingCartIndex = cart.cartList.findIndex(
    item => item.id === id
  );

  if (existingCartIndex === -1) {
    res.status(404);
    throw new Error("Ebook not found in the cart");
  }

  // Remove the ebook from the cartList
  cart.cartList.splice(existingCartIndex, 1);

  const savedCart = await cart.save();
  res.status(200).json(savedCart);
})

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Clear the cartList
  cart.cartList = [];

  const clearedCart = await cart.save();
  res.status(200).json(clearedCart);
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request

  const cart = await Cart.findOne({ userId })
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart)
})


module.exports = {
  addToCart, removeFromCart, clearCart, getUserCart
  // Other cart-related functions can be added here
};