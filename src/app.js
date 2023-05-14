import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import gameRouter from "./routes/games.routes.js"

const port = 5000 || process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(gameRouter)

app.listen(port, () => {
    console.log(`Server running in port ${port}.`)
})
