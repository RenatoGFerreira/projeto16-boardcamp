import joi from "joi"

export const customerSchema = joi.object({
        name: joi.string().min(3).required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().min(11).max(11).pattern(/^[0-9]+$/).required(),
        birthday: joi.date().required()
})