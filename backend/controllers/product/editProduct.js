const Product=require("../../models/productModel")
const productPermisiion=require("../../middleware/productPermission")

async function editProduct(req,res){
    try{
        //get session user id
        const sessionUserId=req.userId;
        //Check whether the session user is admin
        if(!productPermisiion(sessionUserId)){
            throw new Error("Permission Denied");
        }

        const {_id,...rest}=req.body;
        const updatedUser=await Product.findByIdAndUpdate(_id,rest);
        
        res.json({
            error:false,
            success:true,
            message:"Product details updated",
            data:updatedUser,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error",
        })
    }
}

module.exports=editProduct;
