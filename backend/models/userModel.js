module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {

        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: "users",
        timestamps: true
    });

    return User;
};