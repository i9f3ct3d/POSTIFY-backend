const Router = require('express').Router();
const ChatModel = require('../models/chatModel');

Router.post('/',async(req , res)=>{

    const customChatid = req.body.customChatid;

    if(!customChatid){
        return res.sendStatus(204);
    }

    try {

        const message = await ChatModel.findOne({customChatid : customChatid});

        if(message){

            message.isSeen = true;
            message.save();
            return res.sendStatus(200);

        }
        
        return res.sendStatus(204);
        
    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

})

module.exports = Router;