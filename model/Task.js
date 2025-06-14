// model/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now } // tambahkan ini
});

module.exports = mongoose.model('Task', taskSchema);
