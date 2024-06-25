const Product=require("../../models/productModel")

const  displayProduct=async (req,res)=>{
    try{
        const allProduct=await Product.find().sort({createdAt:-1});

        res.json({
            error:false,
            success:true,
            message:"All product details fetched",
            data:allProduct,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=displayProduct;