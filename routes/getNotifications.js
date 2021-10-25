const Router=require("express").Router();
const jwt=require("jsonwebtoken");
const PostReactNotificationModel = require("../models/postReactNotificationModel");
const PostCommentNotificationModel = require("../models/postCommentNotificationModel");

Router.get("/",async(req, res)=>
{
    const token=req.query.token;

    if(token === undefined)
    {
        return res.status(401);
    }
    if(!token)
    {
        return res.sendStatus(404);
        
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.status(401);
        }
        
        const userid = verified.userid;

        const foundPostReactNotifications = await PostReactNotificationModel.find({postOwnerid : userid});
        const foundPostCommentNotifications = await PostCommentNotificationModel.find({postOwnerid : userid});

        const allNotifications = foundPostReactNotifications.concat(foundPostCommentNotifications);

        return res.status(200).json({
            "allNotifications" : allNotifications,
        });
        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
