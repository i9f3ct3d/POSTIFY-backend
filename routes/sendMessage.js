const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const ChatModel = require('../models/chatModel');

Router.post('/',async(req , res)=>{

    const token = req.query.token;

    if(token === undefined)
    {
        return res.sendStatus(204);
    }

    if(!token)
    {
        return res.sendStatus(204);
    }

    try {

        const verify = await jwt.verify(token ,process.env.JWTSECRET);

        if(!verify)
        {
            return res.sendStatus(204);
        }
        
        const conversationId = req.body.conversationId;
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;
        const chatContent = req.body.chatContent;
        const date = req.body.date;
        const customChatid = req.body.customChatid;


        const newChat = new ChatModel({

            conversationId:conversationId,
            senderId : senderId,
            recieverId : recieverId,
            date : date,
            chatContent : chatContent,
            isSeen : false,
            customChatid : customChatid,

        });

        newChat.save();
        
        return res.sendStatus(200);
        
    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

})

module.exports = Router;