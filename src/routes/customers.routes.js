import express from "express"
import { validSchemaCustomers } from "../middlewares/customers.middlewares.js"
import { createNewCustomer } from "../controllers/customers.controllers.js"

const router = express.Router()

router.post("/customers", validSchemaCustomers, createNewCustomer)
// router.get("/customers")
// router.put("/customers")


export default router