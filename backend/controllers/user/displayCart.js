const Cart=require("../../models/cartModel")

const displayCart=async(req,res)=>{
    try{
        const userId=req.userId;

        const cartProducts=await Cart.find({userId:userId}).populate("productId");
        res.json({
            error:false,
            success:true,
            message:"Cart product details fetched",
            data:cartProducts,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!",
        })
    }
}

module.exports=displayCart;