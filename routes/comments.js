const express = require("express");

const router = express.Router();
const commentController = require("../controllers/commentController");

/* --------- Get Comments--------- */

router.get("/", commentController.createComment);

/* --------- Post a Comment--------- */

router.post("/create", commentController.createComment);

/* --------- Delete a Comment --------- */

router.delete("/:id/delete", commentController.deleteComment);

module.exports = router;
