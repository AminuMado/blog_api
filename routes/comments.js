const express = require("express");

const router = express.Router();
const commentController = require("../controllers/commentController");

/* --------- Post a Comment--------- */

router.post("/:id/comment", commentController.createComment);

/* --------- Delete a Comment --------- */

router.delete("/", commentController.deleteComment);

module.exports = router;
