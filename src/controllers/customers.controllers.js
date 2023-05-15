import { db } from "../database/database.js"
import dayjs from "dayjs"

export async function createNewCustomer(req, res){
    const {name, phone, cpf, birthday} = res.locals.customer

    try{
        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
        `,
        [name, phone, cpf, birthday=dayjs(birthday).format("YYYY-MM-DD")]
        )
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res) {
    try {
      const customers = await db.query(
        `
          SELECT * FROM customers;
        `
      );
      const customerResp = {...customers.rows, birthday: dayjs(customers.birthday).format("YYYY-MM-DD") }
            res.status(200).send(customerResp)
    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function getCustomersById(req, res){
    const { id } = req.params

    try{
        const customer = await db.query(

            `SELECT * FROM customers WHERE id= $1;`,
            [id]    
        )
        //console.log(customer.rows[0])
            if(customer.rows.length === 0) return res.sendStatus(404)

            const customerResp = {...customer.rows[0], birthday: dayjs(customer.birthday).format("YYYY-MM-DD") }
            res.status(200).send(customerResp)
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function updateCustomers(req, res){
    const {name, phone, cpf, birthday} = res.locals.customer
    const { id } = req.params

    try{
        await db.query(`
            UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5
        `,
        [name, phone, cpf, birthday, id]
        )
        res.sendStatus(200)
    }catch(err){
        res.status(500).send(err.message);
    }
}