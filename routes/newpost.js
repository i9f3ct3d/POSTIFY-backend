const Router=require("express").Router();
const PostModel=require("../models/postModel");
const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel");

const upload = require('../middleware/multerMiddleWare');

Router.get("/",async(req, res)=>
{
    const token=req.query.token;
    if(token==undefined)
    {
        res.sendStatus(404);
    }
    if(!token)
    {
        return res.status(404).json({"crdentials":"invalid"});
        
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.status(404).json({"crdentials":"invalid"});
        }
        

            const foundUser=await UserModel.findById(verified.userid);
            if(foundUser){
                     
                    return res.status(200).json({"user":foundUser});
                
            }
            
            return res.status(404).json({"crdentials":"invalid"});
            
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
    
})


Router.post("/", upload.single('postImage') ,async(req, res)=>{

    const userid=req.body.userid;
    const username=req.body.username;
    const postContent=req.body.postContent;
    const postTime=req.body.postTime;
    const postDate=req.body.postDate;
    const heading=req.body.heading;

    if(!userid || !username || !postContent || !postTime || !postDate)
    {
        return res.status(404).json({"credentials":"invalid"});
    }

    const postAuthor=await UserModel.findById(userid);
    const newPost=new PostModel({
        heading:heading,
        userid:userid,
        username:username,
        postcontent:postContent,
        postTime:postTime,
        postDate:postDate,
        comments : [],
        likeArray : [],
        authorProfilePic:postAuthor.profilePic,
        postImage:req.file!==undefined && req.file.path,
    })

    
    newPost.save();
    const JWT=jwt.sign({ userid: userid }, process.env.JWTSECRET);
    return res.status(200).json({"credentials":"valid","token":JWT})

})

module.exports=Router;