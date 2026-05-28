const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Simple status endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: "success",
        message: "Server is running",
        timestamp: new Date()
    });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// Test DB Connection and sync models
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        // Sync models
        return db.sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database models synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
