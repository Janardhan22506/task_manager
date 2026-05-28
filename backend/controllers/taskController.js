const { Task } = require('../config/db');

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        
        return res.status(200).json({
            status: "success",
            results: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while fetching tasks"
        });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, stage } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide a task title"
            });
        }

        const task = await Task.create({
            user_id: req.user.id,
            title,
            description: description || '',
            stage: stage || 'To Do'
        });

        return res.status(201).json({
            status: "success",
            data: task
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while creating task"
        });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, stage } = req.body;

        // Find task and verify ownership
        const task = await Task.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!task) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found or you are not authorized to access it"
            });
        }

        // Apply updates
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (stage !== undefined) {
            const validStages = ['To Do', 'In Progress', 'Done'];
            if (!validStages.includes(stage)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid stage. Allowed stages: 'To Do', 'In Progress', 'Done'"
                });
            }
            task.stage = stage;
        }

        await task.save();

        return res.status(200).json({
            status: "success",
            data: task
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while updating task"
        });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task and verify ownership
        const task = await Task.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!task) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found or you are not authorized to delete it"
            });
        }

        await task.destroy();

        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while deleting task"
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
