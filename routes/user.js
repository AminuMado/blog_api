const express = require("express");

// Controller Functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

/* --------- Log In Route --------- */
router.post("/login", loginUser);

/* --------- Sign Up Route --------- */
router.post("/signup", signupUser);

module.exports = router;
