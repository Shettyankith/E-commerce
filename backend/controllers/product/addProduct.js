const Product=require("../../models/productModel");
const productPermisiion=require("../../middleware/productPermission");

async function addProduct(req,res){
    try{
        //get session user id
        const sessionUserId=req.userId;
        //Check whether the session user is admin
        if(!productPermisiion(sessionUserId)){
            throw new Error("Permission Denied");
        }
        //save the data to db
        const details=new Product(req.body);
        const product=await details.save();
        res.status(201).json({
            error:false,
            success:true,
            message:"Product uploaded successfully",
            data:product,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            messgae:e.messgae||"Internal server error!!",
        })
    }
}

module.exports=addProduct;