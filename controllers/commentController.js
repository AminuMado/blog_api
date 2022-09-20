const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

/* --------- Create a Comment --------- */

const createComment = [
  // validate and sanitize input fields

  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment must not be empty"),

  //Process request after validation and sanitization
  async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get the current user This will be done when youre signed in using jwt authorization so for now lets take create a dummy user and use it as the default
    const { content } = req.body;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const userId = "63298c7b5ae2a003d32fd904"; // dummy user
    const author = await User.findById(userId);
    // Add to the database
    try {
      const comment = await Comment.create({ content, author, blog });
      // Find the Blog and add the created comment into it.
      await Blog.findOneAndUpdate(
        { _id: id },
        { $push: { comments: comment } }
      );
      if (!blog) {
        return res.status(400).json({ error: "Blog not found" });
      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
];

/* --------- Delete a Comment--------- */

const deleteComment = async (req, res) => {};

module.exports = { createComment, deleteComment };
