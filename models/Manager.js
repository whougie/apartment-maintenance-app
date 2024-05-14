const { Model, DataTypes } = require('sequilize');
const sequilize = require('../config/connection');

class Manager extends Model {}

Manager.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
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
        sequilize,
        underscored: true,
        modelName: 'manager'
    }

);

module.exports = Manager;