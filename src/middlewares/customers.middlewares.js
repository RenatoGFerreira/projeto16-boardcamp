import { customerSchema } from "../schemas/customers.schemas.js"
import { db } from "../database/database.js"


export async function validSchemaCustomers(req, res, next){
    const customer = req.body

    const validation = customerSchema.validate(customer, { abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    const isCustomerExist = await db.query(
        `
        SELECT * FROM customers WHERE cpf=$1;
        `,
        [customer.cpf]
    )

    if(isCustomerExist.rowCount !== 0) return res.sendStatus(409)


    res.locals.customer = customer 
    next()
}