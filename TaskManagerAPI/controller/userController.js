const myUserDB = {
  users: require("../Exercise/model/myusers.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fsPromises = require("fs").promises;

const handleNewUser = async (req, res) => {
  const { user, pwd, role } = req?.body;

  if (!user || !pwd || !role) {
    return res.status(400).json({
      message: "Username, password, and role are required!!!",
    });
  }

  const verifiedRoles = ["Users", "Admin", "Editor", "TeamMember"];
  if (!verifiedRoles.includes(role)) {
    return res.status(400).json({
      message: `Invalid role. Role must be one of: ${verifiedRoles.join(", ")}`,
    });
  }

  try {
    const duplicate = await User.findOne({ username: user }).exec();
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
      username: user,
      password: hashedPwd,
      roles: roles,
    });

    console.log(result);
    res.status(201).json({
      message: `User ${user} created successfully with role ${role}! `,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);

  const roles = Object.values(foundUser.roles || {});

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "60s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
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

  res.json({ accessToken });
};

const handleRegisterMyUser = async (req, res) => {
  const { firstN, lastN, pwd } = req.body;

  if (!firstN || !lastN || !pwd) {
    return res.status(400).json({
      message: "Firstname, lastname and password are required",
    });
  }
  const duplicate = myUserDB.users.find(
    (person) => person.firstname === firstN
  );
  if (duplicate) return res.sendStatus(409); // User already Exist

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      firstname: firstN,
      lastname: lastN,
      password: hashedPwd,
      roles: { User: 2001 },
    };
    myUserDB.setUsers([...myUserDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "Exercise", "model", "myusers.json"),
      JSON.stringify(myUserDB.users)
    );
    console.log(myUserDB.users);
    res.status(201).json({
      success: `New User ${firstN} created`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleLoginMyUser = async (req, res) => {
  const { firstN, pwd } = req.body;
  if (!firstN || !pwd) {
    return res.status(400).json({
      message: "Firstname and password are required!",
    });
  }

  const foundUser = myUserDB.users.find(
    (person) => person.firstname === firstN
  );
  if (!foundUser) return res.sendStatus(401); // Not Authenticated

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          firstname: foundUser.firstname,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    const refreshToken = jwt.sign(
      { firstname: foundUser.firstname },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = myUserDB.users.filter(
      (person) => person.firstname !== foundUser.firstname
    );

    const currentUser = { ...foundUser, refreshToken };
    myUserDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "Exercise", "model", "myusers.json"),
      JSON.stringify(myUserDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

// GET all employees
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await myUserDB.users;
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleNewUser,
  handleLogin,
  handleRegisterMyUser,
  handleLoginMyUser,
  handleGetAllUsers,
};
