const mongoose=require("mongoose");
const chatSchema=require("../schemas/chatSchema")

const ChatModel=mongoose.model("Chat", chatSchema);

module.exports=ChatModel;
