const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isProfilePic:Boolean,
    profilePic:String,
    friendReqSent:Array,
    friendReqRecieved:Array,
    friends:Array,
    usingGoogleAuth : Boolean,
    googleid : String,
    savedPosts : Array,
    starredPosts : Array,
});

module.exports=userSchema;