const router = require('express').Router();

const accountRoute = require('./account-routes');
const issuesRoute = require('./issues-routes')
const apartmentRoute = require('./apartment-routes')
const handymanRoute = require('./handyman-routes')
// const tenantRoutes = require("./tenant-routes")

router.use('/account', accountRoute);
router.use('/issues', issuesRoute);
router.use('/apartment', apartmentRoute);
router.use('/handyman', handymanRoute);
// router.use('/tenant', tenantRoutes);

module.exports = router;