import mongoose from "mongoose";

let Reviews=new mongoose.Schema({

    review:{
      type:String,
      required:[true,"Please Provide The Review"]
    },
    
    userId:{
        type:String,
        required:[true,"Please Provide The User"]
    },


    userName:{
        type:String,
        required:[true,"Please Provide The UserName"]
    },


    pinId:{
        type:String,
        required:[true,"Please Provide The PinId"]
    },
})

export default mongoose.model("SocialMediaAppReviews",Reviews)