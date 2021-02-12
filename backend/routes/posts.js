const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostController = require("./contollers/post-controller");
const router = express.Router();



router.post("", checkAuth, extractFile, PostController.createPost); // post data in mongoDb
router.get("", PostController.getPosts); // fetch data from mongoDb
router.get("/:id", PostController.getOnePost); // fetch post after restart when update post
router.delete("/:id", checkAuth, PostController.deletePost); // delete a post
router.put("/:id", checkAuth, extractFile, PostController.updatePost); // update post

module.exports = router;
