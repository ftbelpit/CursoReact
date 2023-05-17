const express = require ("express")
const router = express.Router()

router.use(express.json(__dirname + '/src'));

// Controller
const { 
  insertCar, 
  deleteCar,
  getAllCars, 
  getUserCars, 
  getCarById, 
  updateCar
} = require("../controllers/CarController")

// Middlewares
const { carInsertValidation, carUpdateValidation } = require("../middlewares/carValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require ("../middlewares/handleValidation")

// Routes 
router.post(
  "/", 
  authGuard, 
  carInsertValidation(), 
  validate, 
  insertCar
)

router.delete("/:id", authGuard, deleteCar)
router.get("/", authGuard, getAllCars)
router.get("/user/:id", authGuard, getUserCars)
router.get("/:id", authGuard, getCarById)
router.put("/:id", authGuard, carUpdateValidation(), validate, updateCar)

module.exports = router