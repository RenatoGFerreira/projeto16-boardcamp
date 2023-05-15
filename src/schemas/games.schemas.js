import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string().min(1).required(),
  stockTotal: joi.number().integer().required(),
  pricePerDay: joi.number().integer().required()
})