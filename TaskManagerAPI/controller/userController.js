const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleNewUser = async (req, res) => {
  const { email, pwd, role } = req?.body;

  if (!email || !pwd || !role) {
    return res.status(400).json({
      message: "Email, password, and role are required!!!",
    });
  }

  const verifiedRoles = ["Users", "Admin", "Editor", "TeamMember"];
  if (!verifiedRoles.includes(role)) {
    return res.status(400).json({
      message: `Invalid role. Role must be one of: ${verifiedRoles.join(", ")}`,
    });
  }

  try {
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const roles = role
      ? {
          [role]:
            role === "Users"
              ? 2001
              : role === "Admin"
              ? 5150
              : role === "Editor"
              ? 1994
              : 2020,
        }
      : { Users: 2001 };

    const result = await User.create({
      email: email,
      password: hashedPwd,
      roles: roles,
    });

    console.log(result);
    res.status(201).json({
      message: `User ${email} created successfully with role ${role}! `,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);

  const roles = Object.values(foundUser.roles || {});

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        userId: foundUser._id,
        roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "None", // if using https
    secure: true, // if using https
  });

  let activeRoles = [];

  for (let i = 0; i < roles.length; i++) {
    if (roles[i]) {
      activeRoles.push(roles[i]);
    }
  }
  res.json({
    accessToken,
    user: {
      email: foundUser.email,
      roles: activeRoles,
      userId: foundUser._id,
    },
  });
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user?.userId; // from access token middleware
    if (!userId) return res.sendStatus(401);

    const user = await User.findById(userId).select("-password -refreshToken"); // exclude sensitive data
    if (!user) return res.sendStatus(404);

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { email } = req.body;

    if (!userId) return res.sendStatus(401);
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    user.email = email;
    await user.save();

    res.json({ message: "Email updated successfully", email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  handleNewUser,
  handleLogin,
  getUserInfo,
  updateUserInfo,
};
