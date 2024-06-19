async function logout(req,res){
    try{
        //clear the cookies
        res.clearCookie("token");

        res.json({
            data:[],
            error:false,
            success:true,
            message:"Logged out successfully!",
        });
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.msg||"Internal server error",
        })
    }
}

module.exports=logout