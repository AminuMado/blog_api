const express = require("express");

const router = express.Router();
const blogsController = require("../controllers/blogsController");

/* --------- Get all Blogs --------- */

router.get("/", blogsController.getBlogs);

/* --------- Get a single Blog --------- */

router.get("/:id", blogsController.getBlog);

/* --------- Create a Blog --------- */

router.post("/", blogsController.createBlog);

/* --------- Update a Blog --------- */

router.patch("/:id", blogsController.updateBlog);

/* --------- Delete a Blog --------- */

router.delete("/:id", blogsController.deleteBlog);

module.exports = router;
