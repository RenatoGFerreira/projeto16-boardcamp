import { db } from "../database/database.js"

export async function postRentals(req, res){
    const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = res.locals.rental

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

export async function getRentals(req, res){
    try{
        const allRentals = await db.query(
            `
            SELECT 
                rentals.*, 
                customers.id AS "customerId", 
                customers.name AS "customerName",
                games.id AS "gameId",
                games.name AS "gameName"
            FROM 
                rentals
            JOIN
                customers
            ON
                rentals."customerId" = customers.id
            JOIN
                games
            ON
                games.id = rentals."gameId";
            `
            )

        res.send(allRentals.rows)

    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function postReturnRentals(req, res){
    const { id } = req.params

    try{
        const gameDB = await db.query(
            `
            SELECT * FROM rentals WHERE id=$1;
            `,
            [id]
        )
        const rental = gameDB.rows[0]
        if(gameDB.rowCount === 0) return res.sendStatus(404)
        if(rental.returnDate) return res.sendStatus(400)

        const diff = new Date().getTime() - new Date(rental.rentDate).getTime()
        const diffDays = Math.floor(diff / (24 * 3600 * 1000))

        let delayFee = 0 
        if(diffDays > rental.daysRented){
            const addiccionalDays = diffDays - rental.daysRented
            delayFee = addiccionalDays * rental.originalPrice
        }

        await db.query(
            `
                UPDATE rentals SET "returnDate"=now(), "delayFee"=$1
                WHERE id=$2;
            `, [delayFee, id]
        )
        res.sendStatus(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function finishRental(req, res){
    const { id } = req.params
    try{
        const gameDB = await db.query(
            `
            SELECT * FROM rentals WHERE id=$1;
            `,
            [id]
        )

        const rental = gameDB.rows[0]
        if(gameDB.rowCount < 1) return res.sendStatus(404)
        if(rental.returnDate !== null) return res.sendStatus(400)

        await db.query(
            `DELETE FROM rentals WHERE id=$1;`,
            [id]
            )
        res.sendStatus(200)
        
    }catch(err){
        res.status(500).send(err.message)
    }
}