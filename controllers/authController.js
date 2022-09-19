const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

/* --------- Register a User --------- */

const register = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const usernameExists = await User.findOne({ username: value });
      if (usernameExists) {
        throw new Error("Username already exists");
      }
    })
    .escape(),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const emailExists = await User.findOne({ email: value });
      if (emailExists) throw new Error("Email address already exists");
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  body("passwordConfirmation")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation must match password")
    .escape(),
  (req, res, next) => {},
];
/* --------- Login a User --------- */
/* --------- Log Out a User --------- */

module.exports = { register };
