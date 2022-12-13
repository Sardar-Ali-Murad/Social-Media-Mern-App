import mongoose from "mongoose";

let model=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide the name"]
    },
    title:{
        type:String,
        required:[true,"Please Provide the title"]
    },
    category:{
        type:String,
        enum:["animals","nature","electronics","city","village","trends"],
        // required:[true,"Please Provide the category"]
    },
    description:{
        type:String,
        required:[true,"Please Provide the description"]
    },
    image:{
        type:String,
        required:[true,"Please Provide the image"]
    },

    createdBy:{
        type:String,
        required:[true,"Please Provide the userId"]
    },
    creatorName:{
        type:String,
        required:[true,"Please Provide the name"]
    },
})

export default mongoose.model("SocialMediaAppPins",model)