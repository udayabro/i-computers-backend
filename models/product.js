import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,

    },

    altName: {
        type: [String],
        required: false,
        default: []
    },

    price: {
        type: Number,
        required: true

    },

    lablledPrice: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: false

    },

    images: {
        type: [String],
        default: [
            "/images/default-product-01.png",
            "/images/default-product-02.png"
        ]
    },

    brand: {
        type: String,
        required: false
    },

    model: {
        type: String,
        required: false
    },

    category: {
        type: String,
        required: false
    },

    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    }

})

const product = mongoose.model("Product", productSchema)

export default product