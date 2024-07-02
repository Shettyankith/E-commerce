const mongoose = require('mongoose');
const Cart = require("../../models/cartModel");

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        // Convert productId to ObjectId
        const productObjectId =new mongoose.Types.ObjectId(productId);

        // Check if the product already exists in the user's cart
        const productExists = await Cart.findOne({
            userId: userId,
            'products.productId': productObjectId,
        });

        if (productExists) {
            return res.json({
                success: true,
                error: false,
                message: "Product is already exists in your cart",
            });
        }

        const payLoad = {
            productId: productObjectId,
            quantity: 1,
            userId: userId,
        };
        
        const newProduct = new Cart(payLoad);
        const savedProduct = await newProduct.save();
        res.json({
            error: false,
            success: true,
            message: "Product added to cart",
            data: savedProduct,
        });
    } catch (e) {
        res.status(400).json({
            error: true,
            success: false,
            message: e.message || "Internal server error!!",
        });
    }
};

module.exports = addToCart;
