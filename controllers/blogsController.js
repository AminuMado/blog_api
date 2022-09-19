const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

/* --------- Get all Blogs --------- */

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
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
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  // Success... Blog has been found.
  res.status(200).json(Blog);
};

/* --------- Create a Blog --------- */

const createBlog = async (req, res) => {
  // Get the current user This will be done when youre signed in using jwt authorization so for now lets take create a dummy user and use it as the default
  const { title, content } = req.body;
  const author = User.findById();
  // Add to the database
  try {
    const blog = await Blog.create({ title, content, author });
    res.status(200).json(Blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* --------- Update a Blog --------- */

const updateBlog = async (req, res) => {};

/* --------- Delete a Blog --------- */

const deleteBlog = async (req, res) => {};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
