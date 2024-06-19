const mongoose=require("mongoose")

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
    }catch(e){
        console.log(e);
    }
}

module.exports=connectToDB;