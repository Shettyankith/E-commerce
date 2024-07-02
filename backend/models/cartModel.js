const mongoose =require("mongoose");

const cartSchema={
    productId:{
        ref:'Product',
        type:String,
    },
    quantity:Number,
    userId:String,
}

const Cart=mongoose.model("Cart",cartSchema);

module.exports=Cart;