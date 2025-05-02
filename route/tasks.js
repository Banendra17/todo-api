const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

// Tambah task
router.post('/', async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.status(201).json(task);
});

// Lihat semua task
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update task
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Hapus task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
