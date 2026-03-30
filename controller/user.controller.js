import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//register user : /api/user/register
export const registerUser=async(req,res)=>{
    try {
      const{name,email,password}=req.body;
      if(!name||!email||!password){
        return res.status(400).json({message:"please fill the all field",success:false})
      }
      const existingUser=await User.findOne({email})
      if(existingUser){
        return res.status(400).json({message:"user already exist",success:false})
      }

      const salt=await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hash(password,salt)

    const  user=new   User({
        name:name,
        email:email,
        password:hashedPassword
    })
    await user.save();
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production" ? "none" : "Strict",
        maxAge:7*24*60*60*1000,
    })
    
    return res.status(201).json({message:"user register successfully",success:true,user:{name:user.name,email:user.email,password:user.password},token})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }
}


//loginuser : /api/user/login
export const loginUser=async(req,res)=>{
     try {
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"please fill the all field",success:false})
      }
      const user=await User.findOne({email})

      if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password",success:false})
    }
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
     res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production" ? "none" : "Strict",
        maxAge:7*24*60*60*1000,
    })

     return res.status(200).json({message:"User Login successfully",success:true,user:{name:user.name,email:user.email,password:user.password}})
        
     } catch (err) {
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
     }
}

//logout user : /api/user/logout
export const logoutUser=async(req,res)=>{
    try{
      res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production" ? "none" : "Strict",
      })
      res.json({message:"User logged out successfully",success:true})

    } catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
}

//check auth user : /api/user/is-auth

export const isAuthUser=async(req,res)=>{
    try {
        const userId=req.user;
        if(!userId) {
            return res.status(401).json({message:"Unauthorized",success:false})
        }
        const user=await User.findById(userId).select("-password");
        res.json({
            success:true,
            user,
        })
        
    } catch (error) {
         console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
}
