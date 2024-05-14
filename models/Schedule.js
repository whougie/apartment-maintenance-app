const { Model, DataTypes } = require('sequilize');
const sequilize = require('../config/connection');

class Schedule extends Model {}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
       
    },

    {
        sequilize,
        underscored: true,
        modelName: 'schedule'
    }

);

module.exports = Schedule;