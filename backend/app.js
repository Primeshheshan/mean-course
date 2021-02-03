const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const app =  express();

app.use(bodyParser.json()); // parsing json data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {id: 'asd97a982s3', title: 'This is server-side header 1', content: 'This is coming from server'},
    {id: '52s15dsd5aw', title: 'This is server-side header 2', content: 'This is coming from server'},
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
