const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "Danylo", 
  host: "localhost",
  database: "postgres", 
  password: "1", 
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/reset-cart", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const query = `
      INSERT INTO cart_resets (items, reset_date)
      VALUES ($1, NOW());
    `;
    await pool.query(query, [JSON.stringify(cartItems)]);

    res.status(200).send({ message: "Cart reset and data saved to database!" });
  } catch (error) {
    console.error("Error saving reset data:", error);
    res.status(500).send({ message: "Error saving data to database" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${5432}`);
});
