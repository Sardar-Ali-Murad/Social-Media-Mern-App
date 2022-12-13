import mongoose from "mongoose";

let Save=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"Please Provide the UserId"]
    },
    userName:{
        type:String,
        required:[true,"Please Provide the UserName"]
    },
    pinId:{
        type:String,
        required:[true,"Please Provide the PinId"]
    },
    pin:{
        type:Array,
        required:[true,"Please Provide the Pin"]
    }
})

export default mongoose.model("SocialMediaAppSaves",Save)