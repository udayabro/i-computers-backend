import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getAllProducts)
productRouter.post("/", createProduct)
productRouter.delete("/:productId", deleteProduct)  //productId eka parameter ekak widiyata pass karanawa url ekenma
productRouter.put("/:productId", updateProduct)
// productRouter.get("/search", ()=>{
//     console.log("Searching..")
// })
productRouter.get("/:productId", getProductById)

export default productRouter