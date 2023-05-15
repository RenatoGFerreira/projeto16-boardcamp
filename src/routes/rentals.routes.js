import express from "express"
import { AvailableGames, validSchemaRentals } from "../middlewares/rentals.middleware.js"
import { postRentals, getRentals, postReturnRentals, finishRental } from "../controllers/rentals.controllers.js"

const router = express.Router()

router.post("/rentals", validSchemaRentals, AvailableGames, postRentals)
router.get("/rentals", getRentals)
router.post("/rentals/:id/return", postReturnRentals)
router.delete("/rentals/:id", finishRental)

export default router