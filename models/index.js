const Tenant= require('./Tenant');
const Apartment= require('./Apartment');
const Manager= require('./Manager');
const Issues= require('./Issues');

Apartment.hasMany(Tenant,{
    foreignKey: 'apt_id'
})

Tenant.belongsTo(Apartment, {
    foreignKey: 'apt_id'
})

Manager.hasMany(Issues, {
    onDelete: 'SET NULL',
    foreignKey: 'manager_id'
})

Tenant.hasMany(Issues, {
    onDelete: 'SET NULL',
    //foreignKey: 'tenant_id'
})

Apartment.hasMany(Issues, {
    onDelete: 'SET NULL',
    //foreignKey: 'apt_id'
})




// Schedule.belongsToMany(Manager, {
//     through: Issues,
//     foreignKey: 'manager_id'
// })

Issues.belongsTo(Tenant, {
    foreignKey: 'tenant_id'
})
Issues.belongsTo(Manager, {
    foreignKey: 'manager_id'
})
Issues.belongsTo(Apartment, {
    foreignKey: 'apt_id'
})


module.exports= {
Tenant,
Apartment,
Manager,
Issues,
}