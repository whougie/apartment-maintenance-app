const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//const bcrypt= require('bcrypt');

class Tenant extends Model {}

Tenant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            validate: {
                len: [8]
            }
        },
        apt_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'apartment',
                key: 'id'
            }
        }
    },
    // {
    //     hooks: {
    //       beforeCreate: async(tenantData) => {
    //         tenantData.password = await bcrypt.hash(tenantData.password, 10);
    //         return tenantData;
    //       },
    //       beforeUpdate: async(tenantData) => {
    //         if( tenantData.password ){
    //           tenantData.password = await bcrypt.hash(tenantData.password, 10);
    //           return tenantData;
    //         }
    //       },
    //     },
    // },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'tenant'
    }

);

module.exports = Tenant;