const express = require("express");
const UserContorller = require("./contollers/user-contoller");

const router = express.Router();

router.post("/signup", UserContorller.createUser);
router.post("/login", UserContorller.loginUser); // login endpoint

module.exports = router;

