const { Model, DataTypes } = require('sequilize');
const sequilize = require('../config/connection');

class Issues extends Model {}

Issues.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issue: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_requested: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequilize,
        underscored: true,
        modelName: 'issues'
    }

);

module.exports = Issues;