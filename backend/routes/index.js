const express=require("express");
const router=express.Router();
const signup =require("../controllers/user/signin")
const login =require("../controllers/user/login")
const userDetails =require("../controllers/user/userDetails")
const decryptToken=require("../middleware/decryptToken")
const logout=require("../controllers/user/logout")
const allUsers=require("../controllers/user/allUsers")
const updateUser=require("../controllers/user/updateUser")
const addProduct=require("../controllers/product/addProduct")
const displayProduct=require("../controllers/product/displayProduct")
const editProduct=require("../controllers/product/editProduct")
const categoryProduct=require("../controllers/product/categoryProduct")
const categoryWiseProduct=require("../controllers/product/categoryWiseProduct")
const getProductDetails=require("../controllers/product/getProductDetails")
const addToCart=require("../controllers/user/addToCart");
const cartCount=require("../controllers/user/cartCount");
const displayCart=require("../controllers/user/displayCart")
const updateQuantity=require("../controllers/user/updateQuantity")
const deleteCartProduct=require("../controllers/user/deleteCartProduct")
const searchBar=require("../controllers/product/searchBar")

router.post("/signup",signup);

router.post("/login",login);

router.get("/user-details",decryptToken,userDetails);

router.get("/logout",logout);

router.get("/all-users",decryptToken,allUsers);

router.post("/updateUser",decryptToken,updateUser);

router.post("/add-product",decryptToken,addProduct);

router.get("/all-product",displayProduct);

router.post("/editProduct",decryptToken,editProduct);

router.get("/category-product",categoryProduct);

router.post("/category-wise-product",categoryWiseProduct);

router.post("/product-details",getProductDetails);

router.post("/addtocart",decryptToken,addToCart);

router.get("/cartCount",decryptToken,cartCount);

router.get("/viewcart",decryptToken,displayCart);

router.post("/updateQuantity",decryptToken,updateQuantity);

router.post("/deleteCartProduct",decryptToken,deleteCartProduct);

router.get("/search",searchBar);

module.exports=router;