import Product from "../models/product.js"
import { isAdmin } from "./userConroller.js"

export async function createProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only"
        })

        return
    }

    try {

        const existingProduct = await Product.findOne({
            productId: req.body.productId
        })

        if (existingProduct != null) {
            res.status(400).json({
                message: "Product with this productId already exists"
            })
            return
        }

        const newProduct = new Product({
            productId: req.body.productId,
            name: req.body.name,
            altName: req.body.altName,
            price: req.body.price,
            lablledPrice: req.body.lablledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            stock: req.body.stock
        })

        await newProduct.save()
        res.status(201).json({
            message: "Product created successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Error creating product"
        })
    }
}

export async function getAllProducts(req, res) {

    try {

        if (isAdmin(req)) {

            const products = await Product.find()
            res.json(products)
        } else {

            const products = await Product.find({ isAvailable: true })
            res.json(products)
        }

    } catch (err) {
        res.status(500).json({
            message: "Error fetching products"
        })
    }
}

export async function deleteProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Acces denied. Admins only"
        })
        return
    }

    try {

        await Product.deleteOne({
            productId: req.params.productId
        })
        res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Error deleting products"
        })
    }
}

export async function updateProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Acces denied. Admins only"
        })
        return
    }

    try {

        await Product.updateOne({
            productId: req.params.productId
        }, {
            name: req.body.name,
            altName: req.body.altName,
            price: req.body.price,
            lablledPrice: req.body.lablledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            stock: req.body.stock,
            isAvailable: req.body.isAvailable
        })
        res.status(200).json({
            message: "Product updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Error updating products"
        })
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findOne({
            productId: req.params.productId
        })

        if (product == null) {
            res.status(404).json({
                message: "Product not found"
            })
        } else {
            if(product.isAvailable){
                res.status(200).json(product)
            }else{
                if(isAdmin(req)){
                    res.status(200).json(product)
                }else{
                    res.status(403).json({
                        message:"Access denied. Only admin can view"
                    })
                }
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Error fetching product"
        })
    }
}