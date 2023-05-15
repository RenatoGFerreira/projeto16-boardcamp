import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import gameRouter from "./routes/games.routes.js"
import costumerRoute from "./routes/customers.routes.js"
import rentalsRoute from "./routes/rentals.routes.js"

const port = 5000 || process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use(gameRouter)
app.use(costumerRoute)
app.use(rentalsRoute)

app.listen(port, () => {
    console.log(`Server running in port ${port}.`)
})
