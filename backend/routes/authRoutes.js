const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route for registering a user
router.post('/register', register);

// Route for logging in a user
router.post('/login', login);

module.exports = router;
