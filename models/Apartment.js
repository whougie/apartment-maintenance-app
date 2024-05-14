const { Model, DataTypes } = require('sequilize');
const sequilize = require('../config/connection');

class Apartment extends Model {}

Apartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        apt_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        layout: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenant_id: {
            type: DataTyples.INTEGER,
            foreignKey: true,
        }
    },

    {
        sequilize,
        underscored: true,
        modelName: 'apartment'
    }

);

module.exports = Apartment;