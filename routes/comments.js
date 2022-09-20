const express = require("express");

const router = express.Router();
const commentController = require("../controllers/commentController");

/* --------- Post a Comment--------- */

router.post("/:id/comment", commentController.create);

/* --------- Delete a Comment --------- */

router.delete("/", commentController.delete);

module.exports = router;
