const PostModel = require("../models/postModel");
const PostCommentNotificationModel = require("../models/postCommentNotificationModel")
const Router=require("express").Router();

Router.get("/",async(req, res)=>{
    const postid=req.query.postid;
    if(!postid){
        return res.sendStatus(404);
    }

    try {
        const post=await PostModel.findById(postid);
        return res.status(200).json(post);
        
    } catch (error) {
        console.log(error);
    }
})


Router.post("/",async(req, res)=>{
    const username=req.body.username;
    const postid=req.body.postid;
    const comment=req.body.comment;
    const userEmail=req.body.userEmail;
    const userProfilePic=req.body.userProfilePic;

try {
    
    const foundPost=await PostModel.findById(postid);

    let newComment={
        userEmail:userEmail,
        username:username,
        commentContent:comment,
        userProfilePic:userProfilePic
    }

    foundPost.comments.push(newComment);

    const newNotification = new PostCommentNotificationModel({
        type : "comment",
        postid : postid,
        postOwnerid : foundPost.userid,
        commentorid : req.body.userid,
        commentorUsername : username,
        commentorProfilePic : userProfilePic,
        isSeen : false,
        time : new Date()
    })

    await foundPost.save();
    await newNotification.save();

    return res.sendStatus(200);
    
} catch (error) {
    console.log(error);
    res.sendStatus(404);
}
})

module.exports=Router;