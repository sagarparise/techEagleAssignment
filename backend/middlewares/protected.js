const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectedMid = async(req, res, next) =>{
  console.log('protected mid')

  const token = req.headers['authorization'];

  if(!token)
  {
    return res.status(401).json({
      status:401,
     message: "Token not found"
    })
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

 
try {
  const user = await User.findById(decoded.id).select('-password');
  

  if(!user)
  {
    return res.status(401).json({
      status:401,
     message: "User not found"
    })
  }
  req.user = user;
  next();
} catch (error) {
  
  return res.status(500).json({
    status:500,
   message: "Internal Server Error"
  })
}
}

module.exports = protectedMid;
