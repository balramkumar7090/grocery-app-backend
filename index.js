import express  from "express"
import dotenv  from  "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config();
import connected from "./config/db.js";
connected();
import { connectCloudinary } from "./config/cloudinary.js";
connectCloudinary();
import userRoutes from "./routes/user.routes.js"
import sellerRoutes from "./routes/seller.routes.js"
import productRoutes from  "./routes/product.routes.js"
import cartRoutes  from  "./routes/cart.routes.js"
import OrderRoutes from  "./routes/order.routes.js"
import addressRoutes from  "./routes/address.routes.js"


const app=express();
const port=process.env.PORT || 4000;

const allowedOrigins=["https://grocery-app-frontend-zeta.vercel.app/"];

app.use(express.json())
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(cookieParser())
app.use("/images",express.static("uploads"));
app.use("/api/user",userRoutes)
app.use("/api/seller",sellerRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",OrderRoutes)
app.use("/api/address",addressRoutes)


app.get("/",(req,res)=>{
    return res.send("server is start")
})

app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`)
})
