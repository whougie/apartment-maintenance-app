const sequelize = require('../config/connection');

const { Tenants, Issues, Managers, Apartments, Schedule } = require('../models');

const tenantsData = require('./tenant-seeds.json');
const issuesData = require('./issue-seeds.json');
const mangersData = require('./manager-seeds.json');
const apartmentsData = require('./apartment-seeds.json');
const scheduleData = require('./schedule-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const apartments = await Apartment.bulkCreate(apartmentsData);
  const issues = await Issues.bulkCreate(issuesData);
  const tenants = await Tenants.bulkCreate(tenantsData);
  const mangers = await Managers.bulkCreate(mangersData);
  const schedules = await Schedule.bulkCreate(scheduleData);

//   await Dish.bulkCreate(dishData, {
//     individualHooks: true,
//     returning: true,
//   });

   process.exit(0);
};

seedDatabase();