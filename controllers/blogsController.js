const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

/* --------- Get all Blogs --------- */

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate("author")
    .populate("comments")
    .populate("likes");
  res.status(200).json(blogs);
};

/* --------- Get a single Blog --------- */

const getBlog = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }

  // Find the Blog
  const blog = await Blog.findById(id).populate("comments").populate("likes");
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  // Success... Blog has been found.
  res.status(200).json(blog);
};

/* --------- Create a Blog --------- */

const createBlog = [
  // validate and sanitize input fields

  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must not be empty"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content must not be empty"),

  //Process request after validation and sanitization
  async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // input fields are the title,the content and a publish boolean we need to address those
    // Get the current user This will be done when youre signed in using jwt authorization so for now lets take create a dummy user and use it as the default
    const { title, content, published } = req.body;
    const id = "63298c7b5ae2a003d32fd904"; // dummy user
    const author = await User.findById(id);
    // Add to the database
    try {
      const blog = await Blog.create({ title, content, author, published });
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
];

/* --------- Update a Blog --------- */

const updateBlog = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Blog not Found" });
  }

  // Find the Blog and Update
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }
  // Success... Blog has been updated.
  res.status(200).json(blog);
};

/* --------- Delete a Blog --------- */

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Blog not Found" });
  }

  // Find the Blog and Delete
  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }

  // Success... Blog has been deleted.
  res.status(200).json(blog);
};

/* --------- Like a Blog --------- */

const likeBlog = async (req, res) => {
  const { id } = req.params;
  // We need to find the currentuser from the jwt token but for now i am hardcoding the my user Id
  const userId = "63298c7b5ae2a003d32fd904";
  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Blog not Found" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { $addToSet: { likes: userId } }
  );
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }
  return res.status(200).json(blog);
};

/* --------- Unlike a Blog --------- */

const unLikeBlog = async (req, res) => {
  const { id } = req.params;
  // We need to find the currentuser from the jwt token but for now i am hardcoding the my user Id
  const userId = "63298c7b5ae2a003d32fd904";
  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Blog not Found" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: userId } }
  );
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }
  return res.status(200).json(blog);
};
module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  likeBlog,
  unLikeBlog,
};
