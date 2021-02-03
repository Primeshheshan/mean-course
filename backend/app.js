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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

// save data in mongoDb
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
})

// fetch data from mongoDb
app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });

});

// delete a post
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  res.status(200).json({message: "Post deleted successfully!"});
  });

});

module.exports = app;
