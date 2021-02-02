const express = require('express');

const app =  express();


app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: 'asd97a982s3', title: 'This is header 1', content: 'This is coming from server'},
    {id: '52s15dsd5aw', title: 'This is header 2', content: 'This is coming from server'},
  ];
  res.status(200).json({
    message: 'Posts fetched succefully',
    posts: posts
  });
});

module.exports = app;
