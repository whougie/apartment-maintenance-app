const sequelize = require('../config/connection');

const { Tenant, Issues, Manager, Apartment } = require('../models');

const tenantsData = require('./tenant-seeds.json');
const issuesData = require('./issue-seeds.json');
const managersData = require('./manager-seeds.json');
const apartmentsData = require('./apartment-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const apartmentData = await Apartment.bulkCreate(apartmentsData)
  const apartments = apartmentData.map(apartment => apartment.get({ plain: true }))

  const tenantData = await Tenant.bulkCreate(tenantsData.map((tenant, index) => { return { ...tenant, apt_id: apartments[index].id } }));
  const tenants = tenantData.map(tenant => tenant.get({ plain: true }))

  const managerData = await Manager.bulkCreate(managersData);
  const managers = managerData.map(manager => manager.get({ plain: true }))

  const issueData = await Issues.bulkCreate(issuesData.map((issue, index) => {
    return { ...issue, tenant_id: tenants[index].id, manager_id: managers[index].id }
  }));
  const issues = issueData.map(issue => issue.get({plain:true}))
  
  // const withApt = await Issues.findAll({include: [{
  //   model: Tenant,
  //   include: Apartment
  //  },
  // Manager]})
  // const serial = withApt.map(apt => apt.get({plain:true}))
  // console.log(serial)
  process.exit(0);
};

seedDatabase();