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
        tenant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tenant',
                key: 'id'
            }
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
        date_scheduled: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apt_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'apartment',
                key: 'id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'manager',
                key: 'id'
            }
        }
    },

    {
        sequilize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'issues'
    }

);

module.exports = Issues;