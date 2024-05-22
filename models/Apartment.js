const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Apartment extends Model {}
Apartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        apt_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        layout: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // tenant_id: {
        //     type: DataTyples.INTEGER,
        //     references: {
        //         model: 'tenant',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'apartment'
    }
);

module.exports = Apartment;