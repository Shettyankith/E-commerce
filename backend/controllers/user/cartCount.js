const Cart = require("../../models/cartModel");

const cartCount=async(req,res)=>{
    try{
        const userId=req.userId;

        const count=await Cart.countDocuments({userId:userId});

        res.json({
            success:true,
            error:false,
            message:"Product count fetched",
            data:{
                count:count,
            },
        });
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=cartCount;