const express = require('express');
const { getPool } = require('../db');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, name, description, category, price, created_at, updated_at FROM products ORDER BY created_at DESC'
    );

    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar produtos', error);
    res.status(500).json({ message: 'Erro interno ao buscar produtos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, name, description, category, price, created_at, updated_at FROM products WHERE id = ?',
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto', error);
    res.status(500).json({ message: 'Erro interno ao buscar produto' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({ message: 'Campos obrigatórios: name, category e price' });
  }

  try {
    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO products (name, description, category, price) VALUES (?, ?, ?, ?)',
      [name, description || null, category, Number(price)]
    );

    const [rows] = await pool.query(
      'SELECT id, name, description, category, price, created_at, updated_at FROM products WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto', error);
    res.status(500).json({ message: 'Erro interno ao criar produto' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name && !description && !category && price === undefined) {
    return res.status(400).json({ message: 'Informe ao menos um campo para atualização' });
  }

  try {
    const pool = getPool();
    const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);

    if (!existing.length) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await pool.query(
      `UPDATE products SET 
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        category = COALESCE(?, category),
        price = COALESCE(?, price)
      WHERE id = ?`,
      [name, description, category, price !== undefined ? Number(price) : null, req.params.id]
    );

    const [rows] = await pool.query(
      'SELECT id, name, description, category, price, created_at, updated_at FROM products WHERE id = ?',
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto', error);
    res.status(500).json({ message: 'Erro interno ao atualizar produto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover produto', error);
    res.status(500).json({ message: 'Erro interno ao remover produto' });
  }
});

module.exports = router;
