const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    heading:String,
    userid:String,
    username:String,
    postcontent:String,
    postTime:String,
    postDate:String,
    comments:Array,
    likeArray:Array,
    authorProfilePic:String,
    postImage:String,
    postSavedBy : [String]
});

module.exports=postSchema;