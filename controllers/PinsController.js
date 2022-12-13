import pinsModel from "../models/PinsModel.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError,UnAuthenticatedError} from "../errors/index.js"
import Auth from "../models/Auth.js"
import PinsModel from "../models/PinsModel.js"



const createPin=async (req,res)=>{
    
    req.body.createdBy=req.user.userId

    let currentUser=await Auth.findOne({_id:req.user.userId})
    req.body.creatorName=currentUser.name

    if(!req.body.image){
        throw new BadRequestError("Wait for the image to upload then submit OR privide all Values")
    }

  

    let Pin=await PinsModel.create({...req.body})


    res.status(StatusCodes.CREATED).json({msg:"pins is created Successfully",Pin})
}


const getAllPins=async (req,res)=>{
    let queryObj={}
    if(req.body.homeSearch && req.body.homeSearch!=="all"){
        queryObj.name={$regex:homeSearch,$option:"i"}
        queryObj.title={$regex:homeSearch,$option:"i"}
        queryObj.description={$regex:homeSearch,$option:"i"}
    }

    console.log(req.body)

    let result=PinsModel.find(queryObj)

    // let allPins=await PinsModel.find({})

    let allPins=await result
    res.status(StatusCodes.OK).json({allPins})
    
}


const  getSinglePin=async (req,res)=>{
    let {id}=req.params
    let singlePin=await PinsModel.findOne({_id:id})
    if(!singlePin){
    throw new BadRequestError("The Pin is not present")
   }

   res.status(StatusCodes.OK).json({singlePin})
}



const  deletePin=async (req,res)=>{
    let {id}=req.params
    let singlePin=await PinsModel.findOne({_id:id})
    if(!singlePin){
        throw new BadRequestError("The Pin is not present")
    }
    
    if(req.user.userId!=singlePin.createdBy){
        throw new  UnAuthenticatedError("You cannot delete this pin")
    }
    
    await singlePin.remove()
    
    res.status(StatusCodes.OK).json({msg:"pins is deleted Successfully",singlePin})

}


const currentUserPins=async (req,res)=>{
    let pins=await PinsModel.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({pins})
}

export {createPin,getAllPins,deletePin,getSinglePin,currentUserPins}