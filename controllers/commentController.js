const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

/* --------- Get all comments --------- */

const getComments = async (req, res) => {
  const userId = "63298c7b5ae2a003d32fd904";
  const comments = await Comment.find({ author: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json(comments);
};

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
    const { content, blogId } = req.body;
    const blog = await Blog.findById(blogId);
    const userId = "63298c7b5ae2a003d32fd904"; // dummy user
    const author = await User.findById(userId);
    const username = author.username;
    // Add to the database
    try {
      const comment = await Comment.create({ content, username, blog });
      // Find the Blog and add the created comment into it.
      await Blog.findOneAndUpdate(
        { _id: blogId },
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

const deleteComment = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Comment not Found" });
  }

  // Find the Comment and Delete
  const comment = await Comment.findOneAndDelete({ _id: id });
  if (!comment) {
    return res.status(400).json({ error: "Comment not found" });
  }

  // Success... Comment has been deleted.
  res.status(200).json(comment);
};

module.exports = { getComments, createComment, deleteComment };
