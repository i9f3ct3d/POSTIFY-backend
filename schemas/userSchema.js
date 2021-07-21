const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isProfilePic:Boolean,
    profilePic:String,
    friendReqSent:Array,
    friendReqRecieved:Array,
    friends:Array
});

module.exports=userSchema;