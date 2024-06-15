const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateTkn = require("../utils/generateTkn");
const signUp = async(req, res)=>{
  console.log('first login')

  const {name, email, password} = req.body;

  if(!name || !email || !password)
  {
    return res.status(400).json({
      status:400,
     message: "Please add all the fields"
    })
  }
  try {
    const user = await User.findOne({email})

    if(user){
      return res.status(400).json({
        status:400,
       message: "User already exists"
      })
    }
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT))
    console.log(hashPassword)

    const newuser = new User({
      name,
      email,
      password:  hashPassword
    })

    const token = generateTkn({id: newuser._id, email: newuser.email})
    await newuser.save()

    res.status(201).json({
      status:201,
     message: "User created successfully",
     user: {
      name: newuser.name,
      email: newuser.email
     },
     token
    })
    
  } catch (error) {
    
    return res.status(500).json({
      status:500,
     message: "Internal Server Error"
    })
  } 
  

}

const login = async(req, res)=>{

  const {email, password} = req.body;

  if(!email ||!password){
    return res.status(400).json({
      status:400,
     message: "Please add all the fields"
    })
  }
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        status:400,
       message: "User does not exists"
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        status:400,
       message: "Incorrect password"
      })
    }
    const token = generateTkn({id: user._id, email: user.email})
    
    res.status(200).json({
      status:200,
     message: "User logged successfully",
     user,
     token
    })
    
  } catch (error) {
    return res.status(500).json({
      status:500,
     message: "Internal Server Error"
    })
    
  }

  
}

module.exports = {
  signUp,
  login
}