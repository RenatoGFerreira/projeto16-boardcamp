import express from "express"
import { AvailableGames, validSchemaRentals } from "../middlewares/rentals.middleware.js"
import { postRentals } from "../controllers/rentals.controllers.js"

const router = express.Router()

router.post("/rentals", validSchemaRentals, AvailableGames, postRentals)
// router.get("/rentals")
// router,put("/rentals")
// router.delete("/rentals")

export default router