
const User=require("../../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const forgotPassword=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            res.status(404).json({
                error:true,
                success:false,
                message:"User email ID is required",
            })
        }
        if(!password){
            res.status(404).json({
                error:true,
                success:false,
                message:"Please provide new password",
            })
        }
        const userExist=await User.findOne({email});
        if(!userExist){
            res.status(404).json({
                error:true,
                success:false,
                message:"User not found!",
            })
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hashSync(password, salt);


        if (!hashedPassword) {
            return res.status(500).json({
                error: true,
                success: false,
                message: "Sorry, something went wrong on the server."
            });
        }

        

        userExist.password=hashedPassword;
        await userExist.save();

        res.status(201).json({
            data: userExist,
            success: true,
            error: false,
            message: "Password reset successfull"
        });
    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.message||"Internal server error!!",
        })
    }
}

module.exports=forgotPassword;