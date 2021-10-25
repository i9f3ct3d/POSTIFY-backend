const mongoose=require("mongoose");
const postCommentNotificationSchema=require("../schemas/postCommentNotificationSchema")

const postCommentNotificationModel=mongoose.model("PostCommentNotification", postCommentNotificationSchema);

module.exports=postCommentNotificationModel;
