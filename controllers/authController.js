const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

/* --------- Register a User --------- */

const register = [
  // Validate and sanitize input fields
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const usernameExists = await User.findOne({ username: value });
      if (usernameExists) {
        if (usernameExists) return Promise.reject("Username already exists");
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
      if (emailExists) return Promise.reject("Email already exists");
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
  async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Everything is good we can proceed to hash and salt the given password and create a new user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user with trimmed and sanitized data and add to the database;
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
];
/* --------- Login a User --------- */
/* --------- Log Out a User --------- */

module.exports = { register };
