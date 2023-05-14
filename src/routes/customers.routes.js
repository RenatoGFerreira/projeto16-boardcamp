import express from "express"
import { validSchemaCustomers, validSchemaCustomersEdit } from "../middlewares/customers.middlewares.js"
import { createNewCustomer, getCustomers, getCustomersById, updateCustomers } from "../controllers/customers.controllers.js"

const router = express.Router()

router.post("/customers", validSchemaCustomers, createNewCustomer)
router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomersById)
router.put("/customers/:id", validSchemaCustomersEdit, updateCustomers)


export default router