const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};
/* --------- Log In --------- */

const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

/* --------- Sign Up --------- */

const signupUser = async (req, res) => {
  // Get the username email and password from the request
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    // Create a Token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
