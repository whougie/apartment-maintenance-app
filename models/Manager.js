const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manager extends Model {}

Manager.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        manager_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'manager'
    }

);

module.exports = Manager;