const User=require("../../models/user")

async function updateUser(req,res){
    try{
        const {id,name,email,role}=req.body;
        //Modifying the payload
        const payload={
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(role && {role:role}),
        }

        //Update the user
        const updatedUser=await User.findByIdAndUpdate(id,payload);

        //check whether the current user is admin or not
        const sessionUser=await User.findById(req.userId);
        //Send reponse
            res.json({
                error:false,
                success:true,
                data:updatedUser,
                message:`User ${name} has been updated`,
            })

        //Error handling
        if(updatedUser.error){
            toast.error(updatedUser.message);
        }

    }catch(e){
        res.status(400).json({
            error:true,
            success:false,
            message:e.messgae ||"Internal server erorr!!",
        })
    }
}

module.exports=updateUser