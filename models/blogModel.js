// Requre mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// Create a schema
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, default: false },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

// Virtual for blog
// blogSchema.pre().get(function () {});

// Create a model
const Blog = mongoose.model("Blog", blogSchema);

// Export model
module.exports = Blog;
