import jwt from "jsonwebtoken"

export const authSeller=(req,res,next)=>{
    try{
        const {sellerToken}=req.cookies;
        if(!sellerToken){
            return res.status(401).json({message:"Unanthorized",success:false})
        }
        const decoded=jwt.verify(sellerToken,process.env.JWT_SECRET)
        if(decoded.email===process.env.SELLER_EMAIL) {
            next();
        }

    } catch(err){
        console.error("Authentication error:",err);
        return res.status(401).json({message:"Unanthorized",success:false});
    }
}