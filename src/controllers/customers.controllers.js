import { db } from "../database/database.js"

export async function createNewCustomer(req, res){
    const {name, phone, cpf, birthday} = res.locals.customer

    try{
        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
        `,
        [name, phone, cpf, birthday]
        )
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res) {
    try {
      const { rows } = await db.query(
        `
          SELECT * FROM customers;
          `
      );
      res.status(200).send(rows);
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
            if(customer.rows.length === 0) return res.sendStatus(404)

            res.status(200).send(customer.rows[0])
    }catch(err){
        res.status(500).send(err.message);
    }
}