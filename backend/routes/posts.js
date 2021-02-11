const express = require("express");
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require("../middleware/check-auth");
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
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
});

// post data in mongoDb
router.post(
  "",
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPosts => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        id: createdPosts._id,
        title: createdPosts.title,
        content: createdPosts.content,
        imagePath: createdPosts.imagePath
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post falied!"
    });
  });

});

// fetch data from mongoDb
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
      message: 'Posts fetched successfully',
      posts: fetchedPosts,
      maxPosts: count // number of post we have in database
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });

});

// fetch post after restart when update post
router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post"
    });
  });
});

// delete a post
router.delete("/:id", checkAuth, (req, res, next) => {
 Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
 .then(result => {
    if(result.n > 0) {
      res.status(200).json({message: "Post delete successfully!"});
    } else {
      res.status(401).json({message: "Unautherized!"});
    }
  })
 .catch(error => {
    res.status(500).json({
      message: "Couldn't delete post"
    });
  });
});

// update post
router.put("/:id", checkAuth, multer({storage: storage}).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
  .then(result => {
    if(result.nModified > 0) {
      res.status(200).json({message: "Post update successfully!"});
    } else {
      res.status(401).json({message: "Unautherized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post"
    });
  });
});

module.exports = router;
