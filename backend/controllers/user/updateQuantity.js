const mongoose = require('mongoose');
const Cart = require("../../models/cartModel");

const updateQuantity = async (req, res) => {
    try {
        const userId = req.userId;
        const cartProductId = req.body._id;
        const newQuantity = req.body.newQuantity;

       
        const cartProductObjectId = new mongoose.Types.ObjectId(cartProductId);

       
        const updatedProduct = await Cart.updateOne(
            { _id: cartProductObjectId, userId: userId },
            { $set: { quantity: newQuantity } }
        );

        res.json({
            error: false,
            success: true,
            message: "Quantity updated",
            data: updatedProduct,
        });
    } catch (e) {
        res.status(400).json({
            error: true,
            success: false,
            message: e.message || "Internal server error!!",
        });
    }
}

module.exports = updateQuantity;
