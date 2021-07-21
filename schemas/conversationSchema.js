const mongoose=require("mongoose");

const conversationSchema=mongoose.Schema({
    members:Array,
});

module.exports=conversationSchema;