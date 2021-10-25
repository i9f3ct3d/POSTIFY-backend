const Router=require("express").Router();
const PostReactNotificationModel = require("../models/postReactNotificationModel");
const PostCommentNotificationModel = require("../models/postCommentNotificationModel");

Router.post("/",async(req, res)=>
{
    
    const notificationid = req.body.notificationid;
    

    try {


        const foundPostReactNotifications = await PostReactNotificationModel.findById(notificationid);
        const foundPostCommentNotifications = await PostCommentNotificationModel.findById(notificationid);

        if(foundPostCommentNotifications){

            foundPostCommentNotifications.isSeen = true;
            await foundPostCommentNotifications.save();
            
        }else if(foundPostReactNotifications){

            foundPostReactNotifications.isSeen = true;
            await foundPostReactNotifications.save();

        }

        return res.sendStatus(200);
        
    } catch (error) {
        console.log({"error" : error});
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
