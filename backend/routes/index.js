const express=require("express");
const router=express.Router();
const signup =require("../controllers/user/signin")
const login =require("../controllers/user/login")
const userDetails =require("../controllers/user/userDetails")
const decryptToken=require("../middleware/decryptToken")
const logout=require("../controllers/user/logout")

router.post("/signup",signup);

router.post("/login",login);

router.get("/user-details",decryptToken,userDetails);

router.get("/logout",logout);

module.exports=router;