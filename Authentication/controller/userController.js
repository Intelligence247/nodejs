const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roleList = require("../config/roles_list");
const verifyRoles = require("../middleware/verfiyRoles");

const handleNewUser = async (req, res) => {
  const { user, pwd, role } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }
 let verifiedRole ;

 let roles
  if(role) {

     roles = Object.keys(roleList)

     verifiedRole = roles.includes(role)


    if(!verifiedRole) {

      return res.status(404).json({message: "Role is not verified"})
    }
    
  }


  console.log(User);
  const duplicate = await User.findOne({ username: user }).exec();
  console.log(duplicate);
  if (duplicate) return res.sendStatus(409); // Conflict

  // const AvailableRoles = ["User", "Admin", "Editor", "AdminOfAdmin"];

  // if (AvailableRoles.includes(role)){

  }
    try {

      // const roleNum = roles?.find((item) => item === role ? )
      
      const hashedPWD = await bcrypt.hash(pwd, 10);
      const result = await User.create({
        username: user,
        // role: verifiedRole ? {[role]:  }
        password: hashedPWD,
      });

      console.log(result);

      // const newUser = new User();

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

module.exports = { handleNewUser, handleLogin };
