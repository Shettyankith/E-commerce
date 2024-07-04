const Product=require("../../models/productModel")

const filterBy=async(req,res)=>{
    try{
        const filteredList=req?.body?.filteredList||[];

        const products=await Product.find({
            category:{
                "$in":filteredList,
            }
        })

        res.json({
            success:true,
            error:false,
            messgae:"Flitered products fetched",
            data:products,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=filterBy;