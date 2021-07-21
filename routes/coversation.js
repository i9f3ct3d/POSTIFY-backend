const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChatModel = require('../models/chatModel');
const ConversationModel = require('../models/conversationModel');

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
    
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;

        const conversation = await ConversationModel.findOne({members:{$all :[senderId,recieverId]}});

        if( !conversation ){

            const newConversation = new ConversationModel({
                members:[senderId , recieverId]
            })
            newConversation.save();
            return res.status(200).json({"conversation":newConversation});
        }

        return res.status(200).json({"conversation":conversation});
        

        
        
    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

})

module.exports = Router;