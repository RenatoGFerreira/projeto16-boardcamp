import { db } from "../database/database.js";

export async function postGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game;

  try {
    await db.query(
      `
            INSERT INTO games
            (name, image, "stockTotal", "pricePerDay")
            VALUES
            ($1, $2, $3, $4); 
        `,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getGames(req, res) {
  try {
    const { rows } = await db.query(
      `
        SELECT * FROM games;
        `
    );
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
