const jwt = require("jsonwebtoken");


module.exports =(req, res, next) => {
  // get token from incomming request
  try{
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken =  jwt.verify(token, process.env.JWT_KEY) // to verify  look this string
  req.userData = {email: decodedToken.email, userId: decodedToken.userId};
  next();  //does't fail then call next
  } catch {
    res.status(401).json({
      messsage: "You are not authenticated!"
    });
  }
};
