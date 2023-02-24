const express = require("express");
const {
  getPostsCntrl,
  createPostCntrl,
  editPostCntrl,
  deletePostCntrl,
} = require("../controller/post");
const { getPosts } = require("../database");
const { authUser, getUser } = require("../middleware/security");
const {
  validateCreatePost,
  validateEditPost,
  validateDeletePosts,
} = require("../middleware/validation");

const router = express.Router();

router.get("/get-posts", getPostsCntrl);
router.post("/create-post", authUser, validateCreatePost, createPostCntrl);
router.put("/edit-post", authUser, validateEditPost, editPostCntrl);
router.delete("/delete-post", authUser, validateDeletePosts, deletePostCntrl);

module.exports = router;
