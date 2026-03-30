import mongoose from "mongoose";


const  User=new    mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartItems : {type:Object,default:{}},
},
{ minimize:false }
)

const user=mongoose.model("user",User)

export default user;