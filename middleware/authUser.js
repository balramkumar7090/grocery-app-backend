import jwt from "jsonwebtoken"

export const authUser=(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:"Unanthorized",success:false})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded.id;
        next();

    } catch(err){
        console.error("Authentication error:",err);
        return res.status(401).json({message:"Unanthorized",success:false});
    }
}