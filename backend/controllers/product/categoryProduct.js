const Product=require("../../models/productModel");

const categoryProduct=async(req,res)=>{
    try{
        const product=await Product.distinct('category');
        productByCategory=[];
        for(const pr of product){
            const listedProducts=await Product.findOne({category:pr});
            if(listedProducts){
                productByCategory.push(listedProducts)
            }
        }
        res.json({
            error:false,
            success:true,
            message:"Product by category fetched",
            data:productByCategory,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=categoryProduct;