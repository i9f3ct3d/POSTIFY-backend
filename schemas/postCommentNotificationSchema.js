const mongoose=require("mongoose");

const postCommentNotificationSchema=mongoose.Schema({
    type : String,
    postid : String,
    postOwnerid : String,
    commentorid : String,
    commentorUsername : String,
    commentorProfilePic : String,
    isSeen : Boolean,
    time : Date
});

module.exports=postCommentNotificationSchema;