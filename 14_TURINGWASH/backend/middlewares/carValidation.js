const {body} = require("express-validator")

const carInsertValidation = () => {
  return [ 
    body("fabricante")
      .not()
      .equals("undefined")
      .withMessage("O fabricante é obrigatório.")
      .isString()
      .withMessage("O fabricante é obrigatório.")
      .isLength({min: 2})
      .withMessage("O fabricante precisa ter no mínimo 2 caracteres"),
    body("modelo")
      .not()
      .equals("undefined")
      .withMessage("O modelo é obrigatório.")
      .isString()
      .withMessage("O modelo é obrigatório.")
      .isLength({min: 2})
      .withMessage("O modelo precisa ter no mínimo 2 caracteres"),
    body("ano")
      .not()
      .equals("undefined")
      .withMessage("O ano é obrigatório.")
      .isString()
      .withMessage("O ano é obrigatório.")
      .isLength({min: 4})
      .withMessage("O ano precisa ter no mínimo 4 caracteres")
  ]
}

const carUpdateValidation = () => {
  return [
    body("fabricante")
      .optional()
      .isString()
      .withMessage("O fabricate é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O fabricate precisa ter no mínimo 1 caracteres"),
    body("modelo")
      .optional()
      .isString()
      .withMessage("O modelo é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O modelo precisa ter no mínimo 1 caracteres"),
    body("ano")
      .optional()
      .isString()
      .withMessage("O ano é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O ano precisa ter no mínimo 1 caracteres"),
  ]
}

module.exports = {
  carInsertValidation,
  carUpdateValidation
}