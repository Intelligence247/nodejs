const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/index");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400); //Bad request
    throw new Error("All fields Are Required");
  }
  if (password.length < 6) {
    throw new Error("password must be at least 6 characters");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });
  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //24 hrs expiration
    // sameSite: "none",
    // secure: true,
    sameSite: "lax",
    secure: false,
  });

  if (user) {
    const { _id, name, email, isAdmin, orderList, cartList } = user;

    res.status(201).json({
      _id,
      name,
      email,
      cartList,
      orderList,
      isAdmin,
      token,
    }); // success
  } else {
    res.status(400); // Bad request
    throw new Error("Invalid user Credentials");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400); //Bad request
    throw new Error("All fields Are Required");
  }
  if (password.length < 6) {
    throw new Error("password must be at least 6 characters");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: true,
  });
  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //24 hrs expiration
    // sameSite: "none",
    // secure: true,
    sameSite: "lax",
    secure: false,
  });

  if (user) {
    const { _id, name, email, isAdmin, orderList, cartList } = user;

    res.status(201).json({
      _id,
      name,
      email,
      cartList,
      orderList,
      isAdmin,
      token
    }); // success
  } else {
    res.status(400); // Bad request
    throw new Error("Invalid user Credentials");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(foundUser._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    // sameSite: "none",
    // secure: true,
    sameSite: "lax",
    secure: false,
  });

  const { _id, name, isAdmin, cartList, orderList } = foundUser;

  res.status(200).json({
    _id,
    name,
    email,
    isAdmin,
    cartList,
    orderList,
    token,
  });
});

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400);
    res.status(400).json({ message: "User already logged out" });
    throw new Error("User already logged out");
  }

  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // sameSite: "none",
    // secure: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    const { _id, name, email, isAdmin, orderList, cartList } = user;
    res.status(200).json({
      _id,
      name,
      email,
      isAdmin,
      orderList,
      cartList,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  registerAdmin,
  loginUser,
  logout,
  getUserProfile,
};
