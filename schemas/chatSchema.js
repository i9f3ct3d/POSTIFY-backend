const mongoose=require("mongoose");

const chatSchema=mongoose.Schema({
    conversationId : String,
    senderId : String,
    recieverId : String,
    date : Date,
    chatContent : String,
    isSeen : Boolean,
    customChatid : String,
});

module.exports=chatSchema;