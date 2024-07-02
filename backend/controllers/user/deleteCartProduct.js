const Cart=require("../../models/cartModel")

const deleteCartProduct=async(req,res)=>{
    try{
        const userId=req.userId;
        const productId=req?.body?._id;

        const deletedProduct=await Cart.findByIdAndDelete(productId);

        res.json({
            error:false,
            success:true,
            data:deletedProduct,
            message:"Product rmeoved from cart",
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=deleteCartProduct;