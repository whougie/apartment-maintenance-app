const sequelize = require('../config/connection');

const { Tenant, Issue, Manager, Apartment, Handyman } = require('../models');

const tenantsData = require('./tenant-seeds.json');
const issuesData = require('./issue-seeds.json');
const managersData = require('./manager-seeds.json');
const handymansData = require('./handyman-seeds.json');
const apartmentsData = require('./apartment-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const apartmentData = await Apartment.bulkCreate(apartmentsData)
  const apartments = apartmentData.map(apartment => apartment.get({ plain: true }))
  
  const tData = tenantsData.map((tenant, index) => { return { ...tenant, apt_id: apartments[index].id } })
  const tenantData = await Tenant.bulkCreate(tData, { individualHooks: true });
  const tenants = tenantData.map(tenant => tenant.get({ plain: true }))

  const mData = managersData.map((manager) => { return { ...manager } })
  const managerData = await Manager.bulkCreate(mData, { individualHooks: true} );
  const managers = managerData.map(manager => manager.get({ plain: true }))

  const handymanData = await Handyman.bulkCreate(handymansData);
  const handymen = handymanData.map(handyman => handyman.get({ plain: true }))

  const issueData = await Issue.bulkCreate(issuesData.map((issue) => {
    const tenantIndex = Math.floor(Math.random() * (tenants.length));
    const managerIndex = Math.floor(Math.random() * (managers.length));
    return { ...issue, tenant_id: tenants[tenantIndex].id, manager_id: managers[managerIndex].id }

  }));
  const issues = issueData.map(issue => issue.get({plain:true}))
  
  // const withApt = await Issue.findAll({include: [{
  //   model: Tenant,
  //   include: Apartment
  //  },
  // Manager]})
  // const serial = withApt.map(apt => apt.get({plain:true}))
  // console.log(serial)
  //process.exit(0);
};



module.exports = seedDatabase