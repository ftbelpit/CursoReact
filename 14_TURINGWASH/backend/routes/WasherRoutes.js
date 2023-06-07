const express = require ("express")
const router = express.Router()

// Controller
const { 
  insertWasher, 
  deleteWasher, 
  getAllWashers, 
  // getUserPhotos, 
  getWasherById, 
  updateWasher, 
  // likePhoto,
  assessmentWasher,
  searchWashers
} = require("../controllers/WasherController")

// Middlewares
const { washerInsertValidation, washerUpdateValidation, commentValidation } = require("../middlewares/washerValidation")
const authGuardAdmin = require("../middlewares/authGuardAdmin")
const authGuard = require("../middlewares/authGuard")
const validate = require ("../middlewares/handleValidation")
const { imageUpload } = require("../middlewares/imageUpload")

// Routes 
router.post(
  "/", 
  authGuardAdmin, 
  imageUpload.single("image"),
  washerInsertValidation(), 
  validate, 
  insertWasher
)
router.delete("/:id", authGuardAdmin, deleteWasher)
router.get("/", getAllWashers)
// router.get("/user/:id", authGuard, getUserPhotos)
router.get("/search", authGuardAdmin, searchWashers)
router.get("/:id", getWasherById)
router.put("/:id", authGuardAdmin, washerUpdateValidation(), validate, updateWasher)
// router.put("/like/:id", authGuard, likePhoto)
router.put("/assessments/:id", authGuard, commentValidation(), validate, assessmentWasher)

module.exports = router