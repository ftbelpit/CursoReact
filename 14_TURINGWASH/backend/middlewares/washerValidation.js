const {body} = require("express-validator")

const washerInsertValidation = () => {
  return [ 
    body("image")
    .custom((value, { req }) => {
      if(!req.file) {
        throw new Error("A imagem é obrigatória")
      }
      return true
    }),
    body("name")
      .not()
      .equals("undefined")
      .withMessage("O nome é obrigatório.")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O nome precisa ter no minímo 2 caracteres."),
    body("score")
      .optional()
      .isString()
      .withMessage("Insira a nota do lavador.")
      .isFloat({ min: 0, max: 5 })
      .withMessage("A nota deve estar entre 0 e 5."),
    body("assessments")
      .optional()
      .isString()
      .withMessage("Insira as avaliações do lavador.")
      .isLength({ min: 1 })
      .withMessage("Se o lavador tiver avalições insira a quantidade."),
    body("price")
      .isString()
      .withMessage("O preço do lavador é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O preço deve ser de pelo menos 2 dígitos."),

  ]
}

const washerUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O nome precisa ter no mínimo 2 caracteres."),
    body("price")
      .optional()
      .isString()
      .withMessage("O preço é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O preço deve ser de 2 dígitos para cima."),
  ]
}

// const commentValidation = () => {
//   return [
//     body("comment")
//       .isString()
//       .withMessage("O comentário é obrigatório."),
//   ]
// }

module.exports = {
  washerInsertValidation,
  washerUpdateValidation,
  // commentValidation
}