const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app =  express();

mongoose
.connect(
  "mongodb+srv://primesh:"+process.env.MONGO_ATLAS_PASSWORD +"@cluster0.21bca.mongodb.net/userPosts?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('==>Connected to database successfullly!');
})
.catch(() => {
  console.log('==>Connection failed!');
});

app.use(bodyParser.json()); // parsing json data
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts" ,postsRoutes);
app.use("/api/user" ,userRoutes);

module.exports = app;
