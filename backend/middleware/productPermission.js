const User=require("../models/user");

const productPermission=async (userId)=>{
    const user=await User.findById(userId);

    if(user.role!=="ADMIN"){
        return false;
    }
    return true;
}

module.exports=productPermission;