import express from "express"

let router=express.Router()

import {createPin,deletePin,getAllPins,getSinglePin,currentUserPins} from "../controllers/PinsController.js"
import Upload from "../controllers/UploadImage.js"
import Authenticate from "../middleware/auth.js"
import Auth from "../models/Auth.js"

router.route("/").post(Authenticate,createPin).get(Authenticate,getAllPins)
router.route("/upload").post(Upload)
router.route("/currentUser").get(Authenticate,currentUserPins)
router.route("/:id").delete(Authenticate,deletePin).get(Authenticate,getSinglePin)

export default router