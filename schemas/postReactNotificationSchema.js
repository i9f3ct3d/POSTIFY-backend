const mongoose=require("mongoose");

const postReactNotificationSchema=mongoose.Schema({
    type : String,
    postid : String,
    postOwnerid : String,
    reactorid : String,
    reactorUsername : String,
    reactorProfilePic : String,
    isSeen : Boolean,
    time : Date,
});

module.exports=postReactNotificationSchema;