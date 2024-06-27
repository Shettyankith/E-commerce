const Product=require("../../models/productModel")

const categoryWiseProduct=async(req,res)=>{
    try{
        const {category}=req?.body;
        if (!category) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Category is required",
            });
        }
        const product = await Product.find({ category: category.trim() });
        if (product.length === 0) {
            console.warn("No products found for category:", category);
        }
        res.json({
            error:false,
            success:true,
            data:product,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error",
        })
    }
}

module.exports=categoryWiseProduct;