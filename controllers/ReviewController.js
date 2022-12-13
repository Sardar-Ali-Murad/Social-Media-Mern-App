import ReviewModel from "../models/ReviewModel.js"
import PinModel from "../models/PinsModel.js"
import auth from "../models/Auth.js"

import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"

import { StatusCodes } from "http-status-codes"

const createReview=async (req,res)=>{
   let {review,pinId}=req.body

  let pin=await PinModel.findOne({_id:pinId})

  if(!pin){
    throw new BadRequestError("The Pin is Not Present")
  }

  let AlreadyPresent=await ReviewModel.findOne({pinId:pinId,userId:req.user.userId})

  if(AlreadyPresent){
    throw new BadRequestError("You Already Have give Review to this pin")
  }

  req.body.userId=req.user.userId

  let currentUser=await auth.findOne({_id:req.user.userId})

  req.body.userName=currentUser.name

  let reviwsCreated=await ReviewModel.create({...req.body})

  res.status(StatusCodes.CREATED).json({reviwsCreated})

}


const singlePinReviews=async (req,res)=>{
    let {id}=req.params

    let reviews=await ReviewModel.find({pinId:id})

    res.status(StatusCodes.OK).json({reviews})
}

export {createReview,singlePinReviews}