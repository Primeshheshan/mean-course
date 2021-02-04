const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

const app =  express();

mongoose
.connect("mongodb+srv://primesh:SbHAm8bXVq8G4S5@cluster0.21bca.mongodb.net/userPosts?retryWrites=true&w=majority")
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

app.use("/api/posts" ,postsRoutes);

module.exports = app;
