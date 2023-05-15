import { customerSchema } from "../schemas/customers.schemas.js"
import { db } from "../database/database.js"


export async function validSchemaCustomers(req, res, next){
    const customer = req.body
    const validation = customerSchema.validate(customer, { abortEarly: false})
    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
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

export async function validSchemaCustomersEdit(req, res, next){
    const customer = req.body
    const { id } = req.params

    const isAnotherUser = await db.query("SELECT * FROM customers WHERE cpf = $1 AND id <> $2;", [customer.cpf, id]);
    if (isAnotherUser.rows.length > 0) return res.sendStatus(409);

    const validation = customerSchema.validate(customer, { abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.customer = customer 
    next()
}