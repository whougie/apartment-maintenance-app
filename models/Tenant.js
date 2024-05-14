const { Model, DataTypes } = require('sequilize');
const sequilize = require('../config/connection');

class Tenant extends Model {}

Tenant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        tenant_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenant_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenant_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequilize,
        underscored: true,
        modelName: 'tenant'
    }

);

module.exports = Tenant;