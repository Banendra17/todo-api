const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

// routes/tasks.js
router.post('/', async (req, res) => {
  console.log('📩 POST /tasks data:', req.body); // Untuk debugging

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date ? new Date(req.body.date) : undefined // ✅ Gunakan tanggal dari frontend jika ada
  });

  await task.save();
  res.status(201).json(task);
});



// Lihat semua task
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update task (routes/tasks.js)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Hapus task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});



module.exports = router;
