const express = require ("express")
const router = express.Router()

// Controller
const { 
  insertCar, 
  // deletePhoto, 
  // getAllPhotos, 
  // getUserPhotos, 
  // getPhotoById, 
  // updatePhoto, 
  // likePhoto,
  // commentPhoto,
  // searchPhotos
} = require("../controllers/CarController")

// Middlewares
const { carInsertValidation } = require("../middlewares/carValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require ("../middlewares/handleValidation")
// const { imageUpload } = require("../middlewares/imageUpload")

// Routes 
router.post(
  "/", 
  authGuard, 
  carInsertValidation(), 
  validate, 
  insertCar
)

// router.delete("/:id", authGuard, deletePhoto)
// router.get("/", authGuard, getAllPhotos)
// router.get("/user/:id", authGuard, getUserPhotos)
// router.get("/search", authGuard, searchPhotos)
// router.get("/:id", authGuard, getPhotoById)
// router.put("/:id", authGuard, carUpdateValidation(), validate, updateCar)
// router.put("/like/:id", authGuard, likePhoto)
// router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)

module.exports = router