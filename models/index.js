const Tenant = require('./Tenant');
const Apartment = require('./Apartment');
const Manager = require('./Manager');
const Issue = require('./Issue');
const Handyman= require('./Handyman');

Apartment.hasMany(Tenant, {
    foreignKey: 'apt_id'
})

Tenant.belongsTo(Apartment, {
    foreignKey: 'apt_id'
})

Manager.hasMany(Issue, {
    onDelete: 'SET NULL',
    foreignKey: 'manager_id'
})

Handyman.hasMany(Issue, {
    onDelete: 'SET NULL',
    foreignKey: 'manager_id'
})


Tenant.hasMany(Issue, {
    onDelete: 'SET NULL',
    foreignKey: 'tenant_id'
})

Handyman.hasMany(Issue, {
    onDelete: 'SET NULL',
    foreignKey: 'handyman_id'
})

// Schedule.belongsToMany(Manager, {
//     through: Issue,
//     foreignKey: 'manager_id'
// })

Issue.belongsTo(Tenant, {
    foreignKey: 'tenant_id'
})
Issue.belongsTo(Manager, {
    foreignKey: 'manager_id'
})

Issue.belongsTo(Handyman, {
    foreignKey: 'handyman_id'
})

module.exports = {
    Tenant,
    Apartment,
    Manager,
    Issue,
    Handyman
}