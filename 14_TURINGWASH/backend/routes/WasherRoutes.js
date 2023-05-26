const express = require ("express")
const router = express.Router()

// Controller
const { 
  insertWasher, 
  // deleteWasher, 
  getAllWashers, 
  // getUserPhotos, 
  getWasherById, 
  updateWasher, 
  // likePhoto,
  // commentPhoto,
  searchWashers
} = require("../controllers/washerController")

// Middlewares
const { washerInsertValidation, washerUpdateValidation } = require("../middlewares/washerValidation")
const authGuardAdmin = require("../middlewares/authGuardAdmin")
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
// router.delete("/:id", authGuardAdmin, deleteWasher)
router.get("/", authGuardAdmin, getAllWashers)
// router.get("/user/:id", authGuard, getUserPhotos)
router.get("/search", authGuardAdmin, searchWashers)
router.get("/:id", authGuardAdmin, getWasherById)
router.put("/:id", authGuardAdmin, washerUpdateValidation(), validate, updateWasher)
// router.put("/like/:id", authGuard, likePhoto)
// router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)

module.exports = router