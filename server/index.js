require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Allow React Vite app dev server
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server.';
  res.status(statusCode).json({ message });
});

// Database Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tascova';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
