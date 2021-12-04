const Router = require("express").Router();
const ChatModel = require("../models/chatModel");
const ConversationModel = require("../models/conversationModel");
const UserModel = require('../models/userModel');


async function iterate (onlineUsersidArray , unSeenMessagesCount , viewingUserid , i){


    if(i >= onlineUsersidArray.length){
        return unSeenMessagesCount;
    }


    if(onlineUsersidArray[i] === undefined){
        return;
    }
    
    const oIdString = typeof(onlineUsersidArray[i]) != 'string' ? onlineUsersidArray[i].toString() : onlineUsersidArray[i];
    const viewingUseridString = typeof(viewingUserid) != 'string' ? viewingUserid.toString() : viewingUserid;

    const conversationId = await ConversationModel.findOne({members:{$all :[oIdString , viewingUseridString]}});
    
    let unSeenChats = null;
    
    if(conversationId){
        unSeenChats = await ChatModel.find({conversationId : conversationId._id , isSeen : false , recieverId : viewingUserid});
    }
    
    let countOfUnseenMessages = 0;
    
    if(unSeenChats && unSeenChats.length > 0){

        countOfUnseenMessages = unSeenChats.length;
        
    }
    
    await unSeenMessagesCount.push(new Array(oIdString , countOfUnseenMessages));

    return await iterate(onlineUsersidArray , unSeenMessagesCount , viewingUserid , i + 1);


}

Router.post("/",async(req, res)=>
{
    
    const onlineUsersidArray = req.body.onlineUsersidArray;
    const viewingUserid = req.body.viewingUserid;
    
    try {

        
        let onlineUsersData = await UserModel.find({'_id' : { '$in' : onlineUsersidArray }});
        let unSeenMessagesCount = await iterate(onlineUsersidArray , new Array(), viewingUserid , 0);


            return res.status(200).json({
                onlineUsersData : onlineUsersData,
                unSeenMessagesCount : unSeenMessagesCount
            });


        
    } catch (error) {

        console.log({error : error});
        return res.sendStatus(404);
        
    }
    
})


module.exports=Router;
