const express = require ("express")
const router = express.Router()

// Controller
const { 
  insertWash, 
  // deleteCar,
  // getAllCars, 
  // getUserCars, 
  // getCarById, 
  // updateCar
} = require("../controllers/WashController")

// Middlewares
const { washInsertValidation, 
  // carUpdateValidation
 } = require("../middlewares/washValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require ("../middlewares/handleValidation")

// Routes 
router.post("/", authGuard, washInsertValidation(), validate, insertWash)
// router.delete("/:id", authGuard, deleteCar)
// router.get("/", authGuard, getAllCars)
// router.get("/user/:id", getUserCars)
// router.get("/:id", authGuard, getCarById)
// router.put("/:id", authGuard, carUpdateValidation(), validate, updateCar)

module.exports = router