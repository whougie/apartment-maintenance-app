const Tenant= require('./Tenant');
const Apartment= require('./Apartment');
const Manager= require('./Manager');
const Issues= require('./Issues');

Apartment.hasMany(Tenant, {
    foreignKey: 'tenant_id',
})

