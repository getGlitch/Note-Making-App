const user_Model = require("../database/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp = async(req,res)=>{
    try {
        const {username, email, password} = req.body;
    const user = await user_Model.findOne({email});
    if(user){
        return res.status(409).json({message:"User already exists with this Email Id", success:false})
    }
    const newUser = new user_Model({
        username,
        email,
        password
    })
    newUser.password = await bcrypt.hash(password,10);
    await newUser.save();
    res.status(201).json({message:"User registered successfully....", success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", success:false})
    }
    


}
const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
    const user = await user_Model.findOne({email});
    if(!user){
        return res.status(409).json({message:"Invalid email or password", success:false})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(409).json({message:"Invalid email or password", success:false})
    }
    const token = jwt.sign({userId:user._id,username:user.username}, process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({message:"Logged in successfully...", token,user:user.username,success:true})
    
    } catch (error) {
        console.log(error);
    }
    
    }
    

module.exports = {signUp,login};
