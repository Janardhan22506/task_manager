const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('../models/userModel')(sequelize, DataTypes);
db.Task = require('../models/taskModel')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Task, { foreignKey: 'user_id', as: 'tasks', onDelete: 'CASCADE' });
db.Task.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

module.exports = db;
