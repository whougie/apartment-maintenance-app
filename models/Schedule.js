// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Schedule extends Model {}

// Schedule.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//         },
//         fix_date: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         tenant_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'tenant',
//                 key: 'id'
//             }
//         },
//         manager_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'manager',
//                 key: 'id'
//             }
//         },
//         apartment_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'apartment',
//                 key: 'id'
//             }
//         },
//         issue_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'issue',
//                 key: 'id'
//             }
//         },
//     },

//     {
//         sequelize,
//         underscored: true,
//         modelName: 'schedule'
//     }

// );

// module.exports = Schedule;