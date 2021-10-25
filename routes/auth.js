const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

const GOOGLE_CLIENT_ID = '512006172252-qcu30tjf3b1hn7v7fjbfs8mce03ujcej.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.serializeUser((user, done)=>{
    done(null , user);
})

passport.deserializeUser((user, done)=>{
    done(null , user);
})

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/signupusinggoogle/callback"
  },
  async(accessToken, refreshToken, profile, cb)=>{

    try {
        const res = await UserModel.findOne({googleid : profile.id});
        if(!res){
            const newUser=new UserModel({
                username:profile.displayName,
                email:profile._json.email,
                password:null,
                isProfilePic:profile._json.picture ? true : false,
                profilePic: profile._json.picture,
                friendReqSent:[],
                friendReqRecieved:[],
                friends:[],
                usingGoogleAuth:true,
                googleid : profile.id,
                savedPosts : [],
                starredPosts : [],
            })
            
            await newUser.save();
            const JWT=jwt.sign({ userid: newUser._id }, process.env.JWTSECRET);
            return cb(null, {"token" : JWT});
        }
        const JWT=jwt.sign({ userid: res._id }, process.env.JWTSECRET);
        return cb(null, {"token" : JWT});
        
    } catch (error) {

        console.log(error);
        return cb(error, profile);
        
    }

  }
));

