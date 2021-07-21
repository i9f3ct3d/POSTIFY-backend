const mongoose=require("mongoose");
const conversationSchema=require("../schemas/conversationSchema")

const ConversationModel=mongoose.model("Conversation", conversationSchema);

module.exports=ConversationModel;
