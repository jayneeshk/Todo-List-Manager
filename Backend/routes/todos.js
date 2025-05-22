const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /todos - Fetch all todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos - Add a new todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *',
      [text, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;