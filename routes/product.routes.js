import express from "express"
import {addProduct,getProducts,getProductById,changeStock} from "../controller/product.controller.js"
import {authSeller} from "../middleware/authSeller.js"
import { upload } from "../config/multer.js";

const router=express.Router();

router.post("/add-product",authSeller,upload.array("image"),addProduct);
router.get("/list",getProducts);
router.get("/id",getProductById);
router.post("/stock",authSeller,changeStock);



export default router;