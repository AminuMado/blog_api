const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  { timestamps: true }
);

// Create a model
const Comment = mongoose.model("Comment", commentSchema);

// Export model
module.exports = Comment;
