const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

// Test connection
pool.query("SELECT 1", (err, result) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all users
router.get("/users", async (req, res) => {
  console.log("== postgressql", process.env.POSTGRES_URI);

  try {
    const result = await pool.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Update user by ID
router.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
