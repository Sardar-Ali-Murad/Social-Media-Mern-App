import express from "express"

let router=express.Router()

import {createSave,getAllSaves,getSingleUserSaves,deleteSavedPin} from "../controllers/SaveController.js"

router.route("/").post(createSave).get(getAllSaves)
router.route("/:id").delete(deleteSavedPin)
router.route("/currentUser").get(getSingleUserSaves)

export default router