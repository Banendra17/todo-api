const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Tambahkan ini
const taskRoutes = require('./route/tasks');

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors()); // Izinkan permintaan dari domain frontend
app.use(express.json()); // Parsing JSON dari request body

// ✅ Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routing
app.use('/tasks', taskRoutes); // Endpoint: http://localhost:5000/tasks

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
