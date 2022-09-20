/* --------- Create a Comment --------- */

const Blog = require("../models/blogModel");

const createComment = [
  // validate and sanitize input fields

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
    const { content } = req.body;
    const id = "63298c7b5ae2a003d32fd904"; // dummy user
    const author = await User.findById(id);
    const blog = await Blog.findById("6329aa83fe4caa8bd6e9cebb");
    // Add to the database
    try {
      const blog = await Blog.create({ content, author, blog });
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
];

/* --------- Delete a Comment--------- */

const deleteComment = async (req, res) => {};
