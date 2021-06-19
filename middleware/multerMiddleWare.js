const express = require('express');
const multer =require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPE={
    'image/png'  : 'png' , 
    'image/jpeg' : 'jpeg' ,
    'image/jpg'  : 'jpg' ,
}

const upload = multer({
    storage : multer.diskStorage({
        destination : (req , file , cb)=>{ 
            cb(null , "uploads/images/profilePics");
        },
        filename : (req , file , cb)=>{
            let imgName=uuidv4() +"."+ MIME_TYPE[file.mimetype]
            cb(null, imgName);
        }
    }),
    fileFilter: (req , file , cb )=>{
        
        var isValid = !! MIME_TYPE[file.mimetype];

        const error = isValid ? null : new Error("Invalid mimetype !! ");

        cb(error , isValid);

    },

});

module.exports=upload;