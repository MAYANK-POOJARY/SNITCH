import multer, { memoryStorage } from "multer"
import { Router } from "express";
import { createProduct, getSellerProducts } from "../controllers/product.controllers.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
    storage: memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024
    }
})

const productRouter = Router();

productRouter.post('/', authenticateSeller, upload.array("images", 7), createProductValidator, createProduct);
productRouter.get("/seller", authenticateSeller, getSellerProducts)

export default productRouter;