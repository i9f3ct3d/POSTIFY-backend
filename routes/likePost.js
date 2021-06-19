const Router=require("express").Router();
const PostModel=require("../models/postModel");

Router.post("/", async(req, res)=>{
    const postid=req.body.postid;
    const userid=req.body.userid;

    try {

        const FoundPost=await PostModel.findById(postid);

        if(!FoundPost)
        {
            return res.sendStatus(404);
        }
        
        let flag=false;

        FoundPost.likeArray.forEach(ele => {
            if(ele===userid)
            {
                flag=true;
            }
        });

        if(flag)
        {
            FoundPost.likeArray.remove(userid);
        }
        else{
            
            FoundPost.likeArray=[...FoundPost.likeArray,userid];
        }

        
        FoundPost.save();
        return res.status(200).json(FoundPost.likeArray);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
})

module.exports=Router;