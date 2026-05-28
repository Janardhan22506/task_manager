module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define("Task", {

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT
        },

        stage: {
            type: DataTypes.ENUM(
                "To Do",
                "In Progress",
                "Done"
            ),
            defaultValue: "To Do"
        }

    }, {
        tableName: "tasks",
        timestamps: true
    });

    return Task;
};