const express = require("express");

const router = express.Router();

/* --------- Get all Blogs --------- */

router.get("/", (req, res) => {
  res.json({ message: "GET all blogs" });
});

/* --------- Get a single Blog --------- */

router.get("/:id", (req, res) => {
  res.json({ message: "GET a single blog" });
});

/* --------- Create a Blog --------- */

router.post("/", (req, res) => {
  res.json({ message: "POST/CREATE a new blog" });
});

/* --------- Update a Blog --------- */

router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a blog" });
});

/* --------- Delete a Blog --------- */

router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a blog" });
});

module.exports = router;
