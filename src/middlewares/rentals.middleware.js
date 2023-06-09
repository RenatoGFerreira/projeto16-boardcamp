import { db } from "../database/database.js";
import { rentalSchema } from "../schemas/rentals.schema.js";
import dayjs from "dayjs";

export async function validSchemaRentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try{
    const game = await db.query(
        `SELECT * FROM games WHERE id=$1;`,
        [gameId]
        )
        if(game.rowCount === 0 ) return res.sendStatus(400)

        const rental = {
            customerId,
            gameId,
            rentDate: new Date(),
            daysRented,
            returnDate: null,
            originalPrice: daysRented * game.rows[0].pricePerDay,
            delayFee: null
      }

      console.log(rental)

    const validation = rentalSchema.validate(rental, { abortEarly: false})
    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    const isCostumerIdExists = await db.query(
        `SELECT * FROM customers WHERE id=$1;`,
        [customerId]
        )
    if(isCostumerIdExists.rowCount === 0 ) return res.sendStatus(409)


    res.locals.ggame = game
    res.locals.rental = rental

  }catch(err){
    res.status(500).send(err.message)
  }

  next()
}


export async function AvailableGames(req, res, next){
    const game = res.locals.ggame
    console.log(game.rows[0].stockTotal)
    
    try{
        // const rentals = await db.query(
        //     `SELECT * FROM rentals WHERE "gameId"=$1;`,
        //     [game.rows[0].id]
        //     )
        // if(rentals.rows.length > game.stockTotal) return sendStatus(400)

        const rentedGames = await db.query(
          `
        SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL
      `,
          [game.gameId]
        );
        const isAvailableGames = game.rows[0].stockTotal - rentedGames.rows[0].count;
        if (isAvailableGames <= 0) {
          return res.status(400).send("Jogos indisponível para aluguel.");
        }

        console.log(rentedGames.rows[0].count)


    }catch(err){
        res.status(500).send(err.message)
      }

      next()
}