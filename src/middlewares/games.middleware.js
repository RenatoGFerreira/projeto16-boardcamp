import { gamesSchema } from "../schemas/games.schemas.js"
import { db } from "../database/database.js"

export async function validSchemaGames(req, res, next){
    const game = req.body

    const validation = gamesSchema.validate(game, { abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    // const isGameExist = await db.query(
    //     `
    //     SELECT * FROM games WHERE name=$1;
    //     `,
    //     [game.name]
    // )
    // if (isGameExist.rowCount !== 0) return sendStatus(409)


    const isGameExist = await db.query(`SELECT * FROM games WHERE name=$1;`, [req.body.name]);
    if(isGameExist.rows[0]) return res.status(409).send("Já existe um jogo cadastrado com esse nome.");

    res.locals.game = game

    next()
}