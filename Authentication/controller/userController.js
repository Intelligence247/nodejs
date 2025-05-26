const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const path = require("path");
const fsPromises = require("fs").promises;
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    const hashedPWD = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPWD };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({
      success: `New User ${user} created`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); //unauthorised

  // unhashing the password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // JWT logic
    res.json({ success: `user ${user} is logged in!!!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleNewUser, handleLogin };
