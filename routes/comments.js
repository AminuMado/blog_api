const express = require("express");

const router = express.Router();
const commentController = require("../controllers/commentController");
const requireAuth = require("../middleware/requireAuth");

/* --------- Authentication for all blog routes --------- */
router.use(requireAuth);

/* --------- Post a Comment--------- */

router.post("/create", commentController.createComment);

/* --------- Delete a Comment --------- */

router.delete("/:id/delete", commentController.deleteComment);

module.exports = router;
