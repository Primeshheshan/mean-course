const express = require("express");
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename:(req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// post data in mongoDb
router.post("", multer(storage).single("image"), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createdPosts => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPosts._id
    });
  });

});

// fetch data from mongoDb
router.get("", (req, res, next) => {
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });

});

router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
});

// delete a post
router.delete("/:id", (req, res, next) => {
 Post.deleteOne({_id: req.params.id}).then(result => {
   console.log(result);
   res.status(200).json({message: "Post deleted successfully!"});
 });
});

// update post
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "Post update successfully!"});
  });
});

module.exports = router;
