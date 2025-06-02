// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");

// const handleLogout = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204);
//   const refreshToken = cookies.jwt;
//   const foundUser = usersDB.users.find(
//     (person) => person.refreshToken === refreshToken
//   );
//   if (!foundUser) {
//     res.clearCookie("jwt", { httpOnly: true });
//     return res.sendStatus(204);
//   }
//   const otherUsers = usersDB.users.filter(
//     (person) => person.refreshToken !== foundUser.refreshToken
//   );
//   const currentUser = { ...foundUser, refreshToken: "" };
//   usersDB.setUsers([...otherUsers, currentUser]);
//   await fsPromises.writeFile(
//     path.join(__dirname, "..", "model", "users.json"),
//     JSON.stringify(usersDB.users, null, 2)
// );
//   res.clearCookie("jwt", { httpOnly: true });
//   res.sendStatus(204);
// };

// module.exports = { handleLogout };


const myusersDB = {
  users: require("../Exercise/model/myusers.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const User = require("../model/Logout");
const fsPromises = require("fs").promises;
const path = require("path");
const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

const handleMyLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = myusersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  const otherUsers = myusersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  myusersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(myusersDB.users, null, 2)
);
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};
module.exports = { handleLogout, handleMyLogout };
