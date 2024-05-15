const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt= require('bcrypt');

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
        hooks: {
          beforeCreate: async(managerData) => {
            managerData.password = await bcrypt.hash(managerData.password, 10);
            return managerData;
          },
          beforeUpdate: async(managerData) => {
            if( managerData.password ){
              managerData.password = await bcrypt.hash(managerData.password, 10);
              return managerData;
            }
          },
        },
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'manager'
    },


);

module.exports = Manager;