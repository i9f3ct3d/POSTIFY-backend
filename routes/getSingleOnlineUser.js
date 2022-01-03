const Router = require("express").Router();
const ChatModel = require("../models/chatModel");
const UserModel = require('../models/userModel');

Router.post("/",async(req, res)=>
{   
    
    const onlineUserid = req.body.onlineUserid;
    const viewingUserid = req.body.viewingUserid;
    
    try {

        const onlineUserData = await UserModel.findById(onlineUserid);
        const unSeenMessagesCount = await ChatModel.countDocuments({isSeen : false , recieverId : viewingUserid , senderId : onlineUserid})

        const unSeenMessagesCountMap = new Map();
        unSeenMessagesCountMap[onlineUserid] = unSeenMessagesCount;

        const result = {
            onlineUserData : onlineUserData,
            unSeenMessagesCount : unSeenMessagesCountMap
        }

        return res.status(200).json(result);
        
    } catch (error) {

        console.log({error : error});
        return res.sendStatus(404);
        
    }
    
})


module.exports=Router;
