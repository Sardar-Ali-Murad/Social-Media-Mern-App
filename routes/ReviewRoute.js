import express from "express"

let router=express.Router()
import {createReview,singlePinReviews} from "../controllers/ReviewController.js"

router.route("/").post(createReview)
router.route("/:id").get(singlePinReviews)


export default router