const jwt = require("jsonwebtoken");


module.exports =(req, res, next) => {
  // get token from incomming request
  try{
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret_this_should_be_longer") // to verify  look this string
  next();  //does't fail then call next
  } catch {
    res.status(401).json({
      messsage: "Auth failed!"
    });
  }
};
