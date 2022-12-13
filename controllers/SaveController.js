import SaveModel from "../models/SaveModel.js";
import UserModel from "../models/Auth.js"
import PinsModel from "../models/PinsModel.js";

// import { BadRequestError,NotFoundError,UnAuthenticatedError}  from "../error/index.js"
import {BadRequestError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"


const createSave=async (req,res)=>{
      let {pinId}=req.body
      let currentUser=await UserModel.findOne({_id:req.user.userId})
      req.body.userId=req.user.userId
      req.body. userName=currentUser.name

      let currentPin=await PinsModel.findOne({_id:pinId})

      req.body.pin=currentPin

      let AlreadySaved=await SaveModel.findOne({userId:req.user.userId,pinId})
      if(AlreadySaved){
        throw new BadRequestError("You have Already Saved This Pin")
      }

      let save=await SaveModel.create({...req.body})
      res.status(StatusCodes.CREATED).json({save})
    }
    
    const getAllSaves=async (req,res)=>{
        let allSaves=await SaveModel.find({})
        res.status(StatusCodes.OK).json({allSaves})    
    }
    
    
    const getSingleUserSaves=async (req,res)=>{
        let saves=await SaveModel.find({userId:req.user.userId})
        res.status(StatusCodes.OK).json({saves})    
}


const  deleteSavedPin=async (req,res)=>{
  let {id}=req.params
  let singlePin=await SaveModel.findOne({_id:id})
  if(!singlePin){
      throw new BadRequestError("The Pin is not present")
  }
  
  if(req.user.userId!=singlePin.userId){
      throw new  UnAuthenticatedError("You cannot delete this pin")
  }
  
  await singlePin.remove()
  
  res.status(StatusCodes.OK).json({msg:"pins is deleted Successfully",singlePin})

}

export {createSave,getAllSaves,getSingleUserSaves,deleteSavedPin}
