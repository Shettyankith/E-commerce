const Product=require("../../models/productModel")

const getProductDetails=async(req,res)=>{
    try{
        const {id}=req.body;
        const product=await Product.findById(id);
        res.json({
            error:false,
            success:true,
            message:"Product details fetched",
            data:product,
        })
    }catch(e){
        res.status(400).json({
            message:e.message||"Internal Server error!!",
            error:true,
            success:false,
        })
    }
}

module.exports=getProductDetails;