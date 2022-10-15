const User = require("../models/userModel");
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
    res.status(200).json({ username, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
