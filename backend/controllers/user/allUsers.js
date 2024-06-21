const User=require("../../models/user")

async function allUsers(req,res){
    try{
        const allUsers=await User.find();
        res.json({
            message:"All users acquired",
            success:true,
            data:allUsers,
            error:false,
        })
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=allUsers;