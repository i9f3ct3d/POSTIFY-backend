const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isProfilePic:Boolean,
    profilePic:String
});

module.exports=userSchema;