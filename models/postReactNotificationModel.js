const mongoose=require("mongoose");
const postReactNotificationSchema=require("../schemas/postReactNotificationSchema")

const PostReactNotificationModel=mongoose.model("PostReactNotification", postReactNotificationSchema);

module.exports=PostReactNotificationModel;
