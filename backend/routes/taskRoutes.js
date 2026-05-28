const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Secure all task routes using the auth protection middleware
router.use(protect);

// Routes mapped to /api/tasks
router.route('/')
    .get(getTasks)
    .post(createTask);

// Routes mapped to /api/tasks/:id
router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;
