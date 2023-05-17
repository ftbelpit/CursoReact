const {body} = require("express-validator")

const carInsertValidation = () => {
  return [
    body("fabricante")
      .isString()
      .withMessage("O fabricante é obrigatório.")
      .isLength({min: 3})
      .withMessage("O fabricante precisa ter no mínimo 3 caracteres"),
    body("modelo")
      .isString()
      .withMessage("O modelo é obrigatório")
      .isLength({min: 3})
      .withMessage("O modelo precisa ter no mínimo 3 caracteres"),
    body("ano")
      .isString()
      .withMessage("O ano é obrigatório")
      .isLength({ min: 4 })
      .withMessage("O ano precisa ter no mínimo 4 carateres"),
  ] 
}

const carUpdateValidation = () => {
  return [
    body("fabricante")
      .optional()
      .isLength({min: 3})
      .withMessage("O fabricante precisa ter no mínimo 3 caracteres"),
    body("modelo")
      .optional()
      .isLength({ min:3 })
      .withMessage("O modelo precisa ter no mínimo 3 caracteres"),
    body("ano")
      .optional()
      .isLength({ min: 4 })
      .withMessage("O ano precisa ter no mínimo 4 carateres"),
  ]
}

module.exports = {
  carInsertValidation,
  carUpdateValidation,
}