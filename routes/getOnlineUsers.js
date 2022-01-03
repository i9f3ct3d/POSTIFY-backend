const Router = require("express").Router();
const ChatModel = require("../models/chatModel");
const UserModel = require('../models/userModel');


async function iterate (onlineUsersidArray , unSeenMessagesCount , viewingUserid , i){


    if(i >= onlineUsersidArray.length){
        return unSeenMessagesCount;
    }


    if(onlineUsersidArray[i] === undefined){
        return;
    }
    
   const countOfUnseenMessages = await ChatModel.countDocuments({isSeen : false , recieverId : viewingUserid , senderId : onlineUsersidArray[i]});

    unSeenMessagesCount[onlineUsersidArray[i]] = countOfUnseenMessages;

    return await iterate(onlineUsersidArray , unSeenMessagesCount , viewingUserid , i + 1);


}

Router.post("/",async(req, res)=>
{   
    
    const onlineUsersidArray = req.body.onlineUsersidArray;
    const viewingUserid = req.body.viewingUserid;
    
    try {

        
        const onlineUsersData = await UserModel.find({'_id' : { '$in' : onlineUsersidArray }});
        const unSeenMessagesCount = await iterate(onlineUsersidArray , new Map(), viewingUserid , 0);
        // console.log(unSeenMessagesCount);
        const result = {onlineUsersData , unSeenMessagesCount}

        return res.status(200).json(result);
        
    } catch (error) {

        console.log({error : error});
        return res.sendStatus(404);
        
    }
    
})


module.exports=Router;
