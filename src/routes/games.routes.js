import express from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validSchemaGames } from "../middlewares/games.middleware.js";

const router = express.Router()

router.post("/games", validSchemaGames, postGames)
router.get("/games", getGames)

export default router