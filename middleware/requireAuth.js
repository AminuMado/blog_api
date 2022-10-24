const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwtSecret = process.env.SECRET;
const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    // verify the token
    const { _id } = jwt.verify(token, jwtSecret);
    // set the user on the request object with only the id field
    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
