const jwt = require('jsonwebtoken');
const { User } = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    // Check if Bearer token is provided in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];

            // Verify token signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey_change_me');

            // Find user in database and attach to request
            req.user = await User.findByPk(decoded.id);
            
            if (!req.user) {
                return res.status(401).json({
                    status: "fail",
                    message: "User associated with this token no longer exists"
                });
            }

            next();
        } catch (error) {
            console.error("Authentication middleware error:", error);
            return res.status(401).json({
                status: "fail",
                message: "Authentication token is invalid or expired"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "Access denied. Authentication token is missing"
        });
    }
};

module.exports = { protect };
