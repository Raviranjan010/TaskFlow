const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all task routes
router.use(authMiddleware);

// GET /api/tasks
router.get('/', async (req, res) => {
  const { status } = req.query;
  const filter = { userId: req.user.userId };

  if (status === 'pending') {
    filter.isCompleted = false;
  } else if (status === 'completed') {
    filter.isCompleted = true;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const task = await Task.create({
    userId: req.user.userId,
    title,
    description: description || '',
    dueDate: dueDate || null,
  });

  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const taskId = req.params.id;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Verify ownership
  if (task.userId.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to update this task' });
  }

  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

  await task.save();
  res.status(200).json(task);
});

// PATCH /api/tasks/:id/complete
router.patch('/:id/complete', async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Verify ownership
  if (task.userId.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to edit this task' });
  }

  task.isCompleted = !task.isCompleted;
  task.completedAt = task.isCompleted ? new Date() : null;

  await task.save();
  res.status(200).json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Verify ownership
  if (task.userId.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to delete this task' });
  }

  await task.deleteOne();
  res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;
