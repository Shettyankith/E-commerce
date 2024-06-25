const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    price: Number,
    sellingPrice: Number,
    productImage: [],
    description: String,
},{
    timestamps:true,
})

const Product=mongoose.model("Product",productSchema);

module.exports=Product;