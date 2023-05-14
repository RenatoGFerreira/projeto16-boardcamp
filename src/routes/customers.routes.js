import express from "express"
import { validSchemaCustomers } from "../middlewares/customers.middlewares.js"
import { createNewCustomer, getCustomers, getCustomersById } from "../controllers/customers.controllers.js"

const router = express.Router()

router.post("/customers", validSchemaCustomers, createNewCustomer)
router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomersById)
// router.put("/customers")


export default router