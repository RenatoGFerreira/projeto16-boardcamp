import { db } from "../database/database.js"
export async function postRentals(req, res){
    const rental = res.locals.rental

    try{
        await db.query(
            `
            INSERT INTO rentals ("customerId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",
                "originalPrice",
                "delayFee")
            VALUES
            ($1,$2,$3,$4,$5,$6,$7);
                `,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
        )

        res.send(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}