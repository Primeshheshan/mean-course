const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app =  express();

mongoose.connect("mongodb+srv://primesh:SbHAm8bXVq8G4S5@cluster0.21bca.mongodb.net/userPosts?retryWrites=true&w=majority")
.then(() => {
  console.log('==>Connected to database successfullly!');
})
.catch(() => {
  console.log('==>Connection failed!');
});

app.use(bodyParser.json()); // parsing json data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

// save data in mongoDb
app.post("/api/posts", (req, res, next) => {
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
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });

});

app.get("/api/posts/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
});

// delete a post
app.delete("/api/posts/:id", (req, res, next) => {
 Post.deleteOne({_id: req.params.id}).then(result => {
   console.log(result);
   res.status(200).json({message: "Post deleted successfully!"});
 });
});

// update post
app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "Post update successfully!"});
  });
});

module.exports = app;
