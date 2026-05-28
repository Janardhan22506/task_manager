const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../config/db');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey_change_me', {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        // Basic validation
        if (!full_name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide full_name, email, and password"
            });
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid email address"
            });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email is already registered"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            full_name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = generateToken(user.id);

        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error during registration"
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide both email and password"
            });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = generateToken(user.id);

        return res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error during login"
        });
    }
};

module.exports = {
    register,
    login
};
