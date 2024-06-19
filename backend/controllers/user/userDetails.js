const User = require("../../models/user");

async function userDetails(req,res){
    try{
        const id=req.userId
        const currentUser= await User.findById(id);
        res.status(200).json({
            data : currentUser,
            error : false,
            success : true,
            message : "User details"
        })
       
    }catch(e){
        res.status(400).json({
            error: true,
            success: false,
            message: e.message || "Internal Server Error",
        });
    }
}

module.exports=userDetails