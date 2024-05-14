const sequelize = require('../config/connection');

const { Tenant, Issues, Manager, Apartment } = require('../models');

const tenantsData = require('./tenant-seeds.json');
const issuesData = require('./issue-seeds.json');
const managersData = require('./manager-seeds.json');
const apartmentsData = require('./apartment-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const apartments = await Apartments.bulkCreate(apartmentsData);
  const issues = await Issues.bulkCreate(issuesData);
  const tenants = await Tenant.bulkCreate(tenantsData);
  const managers = await Manager.bulkCreate(managersData);

  for (const { apt_number } of apartments) {
   const newApartment = await Apartment.create({
     id: apt_number,
   });
 };

   for (const { id } of tenants) {
      const newTenant = await Apartment.create({ apt_number: apt_number });
   };

   
    for (const { id } of managers) {
      const newManager = await Manager.create({ id: id });
    };

    for (const { id } of issues) {
      const newIssue = await Tenant.create({
        tenant: tenant_name,
        room: apt_number,
      });
    };

   process.exit(0);
};

seedDatabase();