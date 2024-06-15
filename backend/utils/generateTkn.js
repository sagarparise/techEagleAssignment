const jwt = require('jsonwebtoken');

const generateTkn= (userData)=>{

  const token = jwt.sign(userData, process.env.SECRET_KEY);
  return token;

}

module.exports = generateTkn;