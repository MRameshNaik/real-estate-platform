const mongoose=require("mongoose")

const Userschema=new mongoose.Schema({
    ID_name:{ 
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    
})
const User = mongoose.model("User", UserSchema);

module.exports = User;



