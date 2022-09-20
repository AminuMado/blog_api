const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");

/* --------- Get all Users--------- */

router.get("/", (req, res) => {
  res.json({ message: "GET all users" });
});

/* --------- Get a single User --------- */

router.get("/:id", (req, res) => {
  res.json({ message: "GET a single user" });
});

/* --------- Create a User --------- */

router.post("/", authController.register);

/* --------- Update a User--------- */

router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a user" });
});

/* --------- Delete a User --------- */

router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a user" });
});

module.exports = router;
