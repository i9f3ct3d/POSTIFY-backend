const mongoose=require("mongoose");
const postSchema=require("../schemas/postSchema")

const PostModel=mongoose.model("Post", postSchema);

module.exports=PostModel;
